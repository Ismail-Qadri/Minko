import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ArrowLeft, Star, MapPin, Clock, Phone, Mail } from "lucide-react";
import Navbar from "./Navbar";
import { Skeleton } from "../components/ui/skeleton";

interface Store {
  id: string;
  name: string;
  description: string;
  owner: string;
  avatar: string;
  rating: number;
  location: string;
  phone: string;
  email: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
}

const Store = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        // Mock data for now
        setStore({
          id: id || "1",
          name: "Eco Beauty Store",
          description: "Sustainable beauty products for conscious consumers",
          owner: "Sarah Johnson",
          avatar: "/placeholder.svg",
          location: "San Francisco, CA",
          phone: "+1 (555) 123-4567",
          email: "contact@ecobeauty.com",
          rating: 4.8, // Added rating to the mock data
        });

        setProducts([
          {
            id: "1",
            name: "Organic Face Cream",
            price: 29.99,
            image: "/placeholder.svg",
            description: "Natural moisturizing cream",
            category: "Skincare",
            stock: 15
          },
          {
            id: "2",
            name: "Herbal Shampoo",
            price: 19.99,
            image: "/placeholder.svg",
            description: "Chemical-free hair care",
            category: "Haircare",
            stock: 8
          }
        ]);
      } catch (error) {
        console.error("Error fetching store:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-neutral">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Skeleton className="h-64 w-full" />
            </div>
            <div className="lg:col-span-2">
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-neutral">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {store && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card className="lg:col-span-1">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={store.avatar} alt={store.name} />
                  <AvatarFallback>{store.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl">{store.name}</CardTitle>
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{store.rating}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {store.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  {store.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  {store.email}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>About {store.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{store.description}</p>
                <div className="mt-4">
                  <Badge variant="secondary">Owner: {store.owner}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-xl font-bold text-brand-text mb-6">All Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                    <Badge variant="secondary">{product.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-brand-primary">${product.price}</span>
                      <p className="text-xs text-gray-500">{product.stock} in stock</p>
                    </div>
                    <Button
                      onClick={() => navigate(`/checkout/${product.id}`)}
                      className="bg-brand-primary hover:bg-brand-primary/90"
                    >
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;