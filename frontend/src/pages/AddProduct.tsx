import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { ArrowLeft, Upload, Plus } from "lucide-react";
import Navbar from "./Navbar";

const AddProduct = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
    inventory: "",
    featured: false,
    tags: ""
  });

  const categories = [
    "Beauty & Skincare",
    "Fashion & Clothing",
    "Tech & Electronics",
    "Fitness & Health",
    "Home & Lifestyle",
    "Food & Beverages",
    "Books & Education",
    "Art & Crafts",
    "Other"
  ];

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!formData.name || !formData.price || !formData.category) {
      setError("Name, price, and category are required");
      setIsLoading(false);
      return;
    }

    try {
  const token = localStorage.getItem("token");
  const creatorId = localStorage.getItem("userId");
  const user = localStorage.getItem("user");
      let userRole = null;
      let parsedUser = null;
      if (user) {
        try {
          parsedUser = JSON.parse(user);
          userRole = parsedUser.type || parsedUser.role;
        } catch (e) {
          console.error("[AddProduct] Failed to parse user from localStorage:", e, user);
        }
      }
      // console.log("[AddProduct] localStorage user:", user);
      console.log("[AddProduct] parsedUser:", parsedUser);
      console.log("[AddProduct] userRole:", userRole);
      if (!creatorId) {
        setError("No userId found in localStorage. Please log in again.");
        setIsLoading(false);
        return;
      }
      if (!userRole) {
        setError("No user type found in localStorage user. Please log in again.");
        setIsLoading(false);
        return;
      }
      if (userRole !== "creator") {
        setError(`You must be logged in as a creator to add a product. (Found type: ${userRole})`);
        setIsLoading(false);
        return;
      }
      console.log("creatorId", creatorId);
      const response = await fetch("http://localhost:5000/api/products/creator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          creator: creatorId,
          price: parseFloat(formData.price),
          inventory: formData.inventory ? parseInt(formData.inventory) : 0,
          tags: formData.tags ? formData.tags.split(",").map(tag => tag.trim()) : []
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('[AddProduct] Product added:', data);
        if (creatorId) {
          navigate(`/creator/dashboard/${creatorId}`);
        } else {
          navigate("/creator/dashboard");
        }
      } else {
        const data = await response.json();
        setError(data.message || "Failed to add product");
        console.error('[AddProduct] Failed to add product:', response.status, response.statusText);
      }
    } catch (err) {
      console.error("Error adding product:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/creator/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Add New Product</h1>
          <p className="text-muted-foreground">Create a new product for your storefront</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Product Image URL</Label>
                <div className="flex space-x-2">
                  <Input
                    id="image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={(e) => handleChange("image", e.target.value)}
                  />
                  <Button type="button" variant="outline" size="icon">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
                {formData.image && (
                  <div className="mt-2">
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-md border"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your product..."
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="inventory">Inventory Count</Label>
                  <Input
                    id="inventory"
                    type="number"
                    min="0"
                    placeholder="Enter stock quantity"
                    value={formData.inventory}
                    onChange={(e) => handleChange("inventory", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    placeholder="trending, bestseller, new"
                    value={formData.tags}
                    onChange={(e) => handleChange("tags", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label htmlFor="featured" className="font-medium">Featured Product</Label>
                  <p className="text-sm text-muted-foreground">Make this product featured in your storefront</p>
                </div>
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleChange("featured", checked)}
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/creator/dashboard")}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-brand-primary hover:bg-brand-primary/90"
                >
                  {isLoading ? "Adding..." : "Add Product"}
                  <Plus className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddProduct;
