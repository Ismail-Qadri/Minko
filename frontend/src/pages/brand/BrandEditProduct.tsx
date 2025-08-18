import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, Package } from "lucide-react";

// Set axios base URL
axios.defaults.baseURL = "http://localhost:5000";

const BrandEditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    commission: "",
    stock: "",
    category: "",
    image: null as File | null,
    status: "active",
    currentImage: ""
  });

  const categories = [
    "Electronics",
    "Fashion",
    "Beauty",
    "Home & Garden",
    "Sports & Fitness",
    "Books",
    "Toys & Games",
    "Health & Wellness",
    "Food & Beverage",
    "Other"
  ];

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/api/brand/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const product = response.data;
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        commission: product.commission.toString(),
        stock: product.stock.toString(),
        category: product.category,
        image: null,
        status: product.status,
        currentImage: product.image || ""
      });
      
      if (product.image) {
        setImagePreview(product.image);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast({
        title: "Error",
        description: "Failed to load product details",
        variant: "destructive"
      });
      navigate("/brand/dashboard");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      
      // Create FormData for file upload
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("commission", formData.commission);
      data.append("stock", formData.stock);
      data.append("category", formData.category);
      data.append("status", formData.status);
      
      if (formData.image) {
        data.append("image", formData.image);
      }

      await axios.put(`/api/brand/products/${productId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      toast({
        title: "Success",
        description: "Product updated successfully"
      });

      navigate("/brand/dashboard");
    } catch (error: any) {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update product",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brand-text-light">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/brand/dashboard")}
              className="text-brand-text hover:text-brand-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="w-px h-6 bg-border"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary"></div>
              <span className="text-xl font-bold text-brand-text">MINKO</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-text">Edit Product</h1>
          <p className="text-brand-text-light">Update your product details</p>
        </div>

        <Card className="border-brand-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center text-brand-text">
              <Package className="w-5 h-5 mr-2 text-brand-primary" />
              Product Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-brand-text">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    required
                    className="border-brand-primary/20 focus:border-brand-primary"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label className="text-brand-text">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    required
                  >
                    <SelectTrigger className="border-brand-primary/20 focus:border-brand-primary">
                      <SelectValue placeholder="Select category" />
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

                {/* Price */}
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-brand-text">Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    required
                    className="border-brand-primary/20 focus:border-brand-primary"
                  />
                </div>

                {/* Commission */}
                <div className="space-y-2">
                  <Label htmlFor="commission" className="text-brand-text">Commission (%)</Label>
                  <Input
                    id="commission"
                    name="commission"
                    type="number"
                    min="1"
                    max="50"
                    value={formData.commission}
                    onChange={handleInputChange}
                    placeholder="15"
                    required
                    className="border-brand-primary/20 focus:border-brand-primary"
                  />
                </div>

                {/* Stock */}
                <div className="space-y-2">
                  <Label htmlFor="stock" className="text-brand-text">Stock Quantity</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="100"
                    required
                    className="border-brand-primary/20 focus:border-brand-primary"
                  />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label className="text-brand-text">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger className="border-brand-primary/20 focus:border-brand-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-brand-text">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your product..."
                  rows={4}
                  required
                  className="border-brand-primary/20 focus:border-brand-primary"
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label className="text-brand-text">Product Image</Label>
                <div className="border-2 border-dashed border-brand-primary/20 rounded-lg p-6">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg mx-auto"
                      />
                      <div className="text-center space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setImagePreview(null);
                            setFormData(prev => ({ ...prev, image: null }));
                          }}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          Remove Image
                        </Button>
                        <Label htmlFor="image-upload" className="cursor-pointer">
                          <Button
                            type="button"
                            variant="outline"
                            className="text-brand-primary border-brand-primary/20"
                            asChild
                          >
                            <span>Change Image</span>
                          </Button>
                        </Label>
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-brand-primary" />
                      <p className="text-brand-text-light mb-2">Upload product image</p>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="max-w-xs mx-auto border-brand-primary/20"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-4 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-brand-primary hover:bg-brand-primary/90 text-white"
                >
                  {loading ? "Updating Product..." : "Update Product"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/brand/dashboard")}
                  className="border-brand-primary/20 text-brand-text"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BrandEditProduct;