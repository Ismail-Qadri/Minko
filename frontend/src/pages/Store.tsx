// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Separator } from "@/components/ui/separator";
// import { useLocation, useRoute } from "wouter";
// import { useQuery } from "@tanstack/react-query";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Star, ShoppingCart, Instagram, Youtube, Users, ExternalLink, Share2 } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import Navbar from "./Navbar";

// // Demo products data - replace with your API
// const demoProducts = [
//   {
//     id: "1",
//     name: "Signature Skincare Set",
//     description: "My personal 3-step skincare routine that keeps my skin glowing. Includes cleanser, serum, and moisturizer.",
//     price: "89.99",
//     image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
//     category: "Beauty",
//     stock: 25,
//     featured: true
//   },
//   {
//     id: "2", 
//     name: "Premium Workout Bundle",
//     description: "Everything you need for home workouts - resistance bands, yoga mat, and my exclusive workout guide.",
//     price: "129.99",
//     image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
//     category: "Fitness",
//     stock: 15,
//     featured: true
//   },
//   {
//     id: "3",
//     name: "Photography Presets Pack",
//     description: "10 professional Lightroom presets I use for all my Instagram photos. Instant download.",
//     price: "29.99",
//     image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=300&fit=crop",
//     category: "Digital",
//     stock: 100,
//     featured: false
//   },
//   {
//     id: "4",
//     name: "Travel Essentials Kit",
//     description: "My must-have travel accessories including packing cubes, portable charger, and travel pillow.",
//     price: "79.99",
//     image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=300&fit=crop",
//     category: "Travel",
//     stock: 20,
//     featured: false
//   }
// ];

// const Storefront = () => {
//   const [, paramsRaw] = useRoute("/store/:creatorId");
//   const params: { creatorId?: string } = paramsRaw ?? {};
//   const [, setLocation] = useLocation();
//   const { toast } = useToast();
//   const creatorId = params.creatorId ?? "";

//   // Define a type for creator
//   type Creator = {
//     id: string;
//     name: string;
//     handle: string;
//     bio: string;
//     followers: string;
//     category: string;
//     rating: string;
//     totalSales: number;
//     products: number;
//     verified: boolean;
//     instagram?: string;
//     youtube?: string;
//   };

//   // Fetch creator data
//   const { data: creator, isLoading: creatorLoading } = useQuery<Creator>({
//     queryKey: ["/api/creators", creatorId],
//     enabled: !!creatorId,
//   });

//   // Demo data for when creator is not found or loading
//   const demoCreator = {
//     id: creatorId,
//     name: "Sarah Johnson",
//     handle: "@sarahjohnson",
//     bio: "Beauty & lifestyle content creator sharing my favorite products and daily routines. Helping you glow from within! ✨",
//     followers: "125K",
//     category: "Beauty & Lifestyle",
//     rating: "4.8",
//     totalSales: 1250,
//     products: 4,
//     verified: true,
//     instagram: "@sarahjohnson",
//     youtube: "Sarah Johnson Beauty"
//   };

//   const displayCreator = creator || demoCreator;

//   const handleAddToCart = (product: any) => {
//     // Navigate to checkout with product info
//     setLocation(`/checkout/${product.id}?creatorId=${creatorId}`);
//   };

//   const handleShare = () => {
//     const url = window.location.href;
//     navigator.clipboard.writeText(url);
//     toast({
//       title: "Link Copied!",
//       description: "Storefront link copied to clipboard",
//     });
//   };

//   if (creatorLoading) {
//     return (
//       <div className="min-h-screen bg-brand-neutral">
//         <div className="max-w-6xl mx-auto px-4 py-8">
//           <Skeleton className="h-48 w-full mb-8" />
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[...Array(6)].map((_, i) => (
//               <Skeleton key={i} className="h-80 w-full" />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-brand-neutral">
//       {/* Header */}
//       <Navbar />

//       {/* Creator Profile Section */}
//       <div className="bg-white border-b">
//         <div className="max-w-6xl mx-auto px-4 py-12">
//           <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
//             <Avatar className="w-32 h-32">
//               <AvatarFallback className="text-2xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
//                 {displayCreator.name.split(' ').map((n: string) => n[0]).join('')}
//               </AvatarFallback>
//             </Avatar>
            
//             <div className="flex-1 text-center md:text-left">
//               <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
//                 <h1 className="text-3xl font-bold text-brand-text">{displayCreator.name}</h1>
//                 {displayCreator.verified && (
//                   <Badge variant="secondary" className="bg-blue-100 text-blue-800">
//                     Verified
//                   </Badge>
//                 )}
//               </div>
              
//               <p className="text-brand-accent font-medium mb-4">{displayCreator.handle}</p>
//               <p className="text-gray-600 mb-6 max-w-2xl">{displayCreator.bio}</p>
              
//               <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mb-6">
//                 <div className="flex items-center gap-2">
//                   <Users className="w-5 h-5 text-brand-primary" />
//                   <span className="font-semibold">{displayCreator.followers}</span>
//                   <span className="text-gray-600">followers</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Star className="w-5 h-5 text-yellow-500 fill-current" />
//                   <span className="font-semibold">{displayCreator.rating}</span>
//                   <span className="text-gray-600">rating</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <ShoppingCart className="w-5 h-5 text-brand-primary" />
//                   <span className="font-semibold">{displayCreator.totalSales}</span>
//                   <span className="text-gray-600">sales</span>
//                 </div>
//               </div>
              
//               <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
//                 {displayCreator.instagram && (
//                   <Button variant="outline" size="sm" asChild>
//                     <a href={`https://instagram.com/${displayCreator.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
//                       <Instagram className="w-4 h-4 mr-2" />
//                       Instagram
//                     </a>
//                   </Button>
//                 )}
//                 {displayCreator.youtube && (
//                   <Button variant="outline" size="sm" asChild>
//                     <a href={`https://youtube.com/@${displayCreator.youtube}`} target="_blank" rel="noopener noreferrer">
//                       <Youtube className="w-4 h-4 mr-2" />
//                       YouTube
//                     </a>
//                   </Button>
//                 )}
//                 <Button variant="outline" size="sm" onClick={handleShare}>
//                   <Share2 className="w-4 h-4 mr-2" />
//                   Share Store
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Products Section */}
//       <div className="max-w-6xl mx-auto px-4 py-12">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-2xl font-bold text-brand-text">Featured Products</h2>
//           <Badge variant="outline">{demoProducts.length} products</Badge>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//           {demoProducts.filter(p => p.featured).map((product) => (
//             <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
//               <div className="aspect-square overflow-hidden">
//                 <img 
//                   src={product.image} 
//                   alt={product.name}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//               </div>
//               <CardHeader className="pb-3">
//                 <div className="flex items-start justify-between">
//                   <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
//                   <Badge variant="secondary">{product.category}</Badge>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <span className="text-2xl font-bold text-brand-primary">${product.price}</span>
//                     <p className="text-xs text-gray-500">{product.stock} in stock</p>
//                   </div>
//                   <Button 
//                     onClick={() => handleAddToCart(product)}
//                     className="text-black"
//                   >
//                     <ShoppingCart className="w-4 h-4 mr-2 text-black" />
//                     Buy Now
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <Separator className="my-8" />

//         <h3 className="text-xl font-bold text-brand-text mb-6">All Products</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {demoProducts.map((product) => (
//             <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
//               <div className="aspect-square overflow-hidden">
//                 <img 
//                   src={product.image} 
//                   alt={product.name}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//               </div>
//               <CardHeader className="pb-3">
//                 <div className="flex items-start justify-between">
//                   <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
//                   <Badge variant="secondary">{product.category}</Badge>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <span className="text-2xl font-bold text-brand-primary">${product.price}</span>
//                     <p className="text-xs text-gray-500">{product.stock} in stock</p>
//                   </div>
//                   <Button 
//                     onClick={() => handleAddToCart(product)}
//                     className="text-black"
//                   >
//                     <ShoppingCart className="w-4 h-4 mr-2" />
//                     Buy Now
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Storefront;







import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useLocation, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, ShoppingCart, Instagram, Youtube, Users, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "./Navbar";
import axios from "axios";

// Fetch helper
// async function fetchCreator(creatorId: string) {
//   try {
//     const res = await axios.get(`http://localhost:5000/api/creators/${creatorId}`);
//     console.log("store data", res.data);
//     return res.data;
//   } catch (error) {
//     console.error("Error fetching creator:", error);
//     throw new Error("Failed to fetch creator");
//   }
// }

async function fetchCreator(creatorId: string) {
  if (!creatorId) throw new Error("No creator ID provided");
  const res = await axios.get(`http://localhost:5000/api/store/${creatorId}`);
  return res.data; // { creator, products }
}

const Store = () => {
  const [, paramsRaw] = useRoute("/store/:creatorId");
  const params: { creatorId?: string } = paramsRaw ?? {};
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const creatorId = params.creatorId ?? "";

  // Fetch creator
  const { data: creator, isLoading: creatorLoading } = useQuery({
    queryKey: ["creator", creatorId],
    queryFn: () => fetchCreator(creatorId),
    enabled: !!creatorId,
  });

  // Fetch products
//   const { data: products, isLoading: productsLoading } = useQuery({
//     queryKey: ["products", creatorId],
//     queryFn: () => fetchProducts(creatorId),
//     enabled: !!creatorId,
//   });

  const handleAddToCart = (product: any) => {
    setLocation(`/checkout/${product.id}?creatorId=${creatorId}`);
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link Copied!",
      description: "Storefront link copied to clipboard",
    });
  };
// || productsLoading
//   if (creatorLoading ) {
//     return (
//       <div className="min-h-screen bg-brand-neutral">
//         <div className="max-w-6xl mx-auto px-4 py-8">
//           <Skeleton className="h-48 w-full mb-8" />
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[...Array(6)].map((_, i) => (
//               <Skeleton key={i} className="h-80 w-full" />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Creator not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-neutral">
      <Navbar />

      {/* Creator Profile */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <Avatar className="w-32 h-32">
              <AvatarFallback>
  {creator.name
    ? creator.name.split(" ").map((n: string) => n[0]).join("")
    : ""}
</AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <h1 className="text-3xl font-bold text-brand-text">{creator.name}</h1>
                {creator.verified && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Verified
                  </Badge>
                )}
              </div>
              
              <p className="text-brand-accent font-medium mb-4">{creator.handle}</p>
              <p className="text-gray-600 mb-6 max-w-2xl">{creator.bio}</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-brand-primary" />
                  <span className="font-semibold">{creator.followers}</span>
                  <span className="text-gray-600">followers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">{creator.rating}</span>
                  <span className="text-gray-600">rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-brand-primary" />
                  <span className="font-semibold">{creator.totalSales}</span>
                  <span className="text-gray-600">sales</span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                {creator.instagram && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={`https://instagram.com/${creator.instagram.replace('@', '')}`} target="_blank">
                      <Instagram className="w-4 h-4 mr-2" /> Instagram
                    </a>
                  </Button>
                )}
                {creator.youtube && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={`https://youtube.com/@${creator.youtube}`} target="_blank">
                      <Youtube className="w-4 h-4 mr-2" /> YouTube
                    </a>
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" /> Share Store
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      {/* <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-brand-text">Products</h2>
          <Badge variant="outline">{products?.length || 0} products</Badge>
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any) => (
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
                    <Button onClick={() => handleAddToCart(product)} className="text-black">
                      <ShoppingCart className="w-4 h-4 mr-2" /> Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No products found for this creator</p>
        )}
      </div> */}
    </div>
  );
};

export default Store;
