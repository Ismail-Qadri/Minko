
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import {
  Package, TrendingUp, DollarSign, Users, Plus,
  Star, CheckCircle, XCircle, Edit, Trash2,
  Eye, ShoppingCart, Calendar, Award
} from "lucide-react";
import Navbar from "../Navbar";


const BrandDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [brand, setBrand] = useState<any>(null);
  const [brandForm, setBrandForm] = useState<any>(null);
  const [updating, setUpdating] = useState(false);
  console.log("BrandDashboard render", { brand, brandForm, activeTab });
  // Fetch brand info on mount
  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const brandId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        console.log("Fetching brand info", { brandId, token });
        if (!brandId || !token) return;
        const res = await fetch(`http://localhost:5000/api/brands/${brandId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to fetch brand info");
        const data = await res.json();
        console.log("Fetched brand data", data);
        setBrand(data);
        setBrandForm({
          name: data.name || "",
          email: data.email || "",
          website: data.website || "",
          phone: data.phone || "",
          description: data.description || "",
          // avatar: data.avatar || ""
        });
      } catch (err) {
        console.error("Error fetching brand info", err);
        setBrand(null);
      }
    };
    fetchBrand();
  }, []);
  const [showAddProduct, setShowAddProduct] = useState(false);
  
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [creatorRequests, setCreatorRequests] = useState<any[]>([]);
  // // Fetch creator requests for this brand
  // useEffect(() => {
  //   const fetchCreatorRequests = async () => {
  //     try {
  //       const brandId = localStorage.getItem("userId");
  //       const res = await fetch(`http://localhost:5000/api/brand-requests?brandId=${brandId}`,
  //         { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } });
  //       const data = await res.json();
  //       setCreatorRequests(Array.isArray(data) ? data : []);
  //     } catch (err) {
  //       setCreatorRequests([]);
  //     }
  //   };
  //   fetchCreatorRequests();
  // }, []);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    commission: "",
    category: "",
    description: "",
    image: ""
  });

  const safeProducts = Array.isArray(products) ? products : [];
  const stats = {
    totalProducts: safeProducts.length,
    totalRevenue: safeProducts.reduce((sum, p) => sum + ((p.price || 0) * (p.sales || 0)), 0),
    totalCreators: safeProducts.reduce((sum, p) => sum + (p.creatorsPromoting || 0), 0),
    conversionRate: 4.8 // You may want to fetch this from backend in future
  };

  const categories = [
    "Electronics", "Fashion", "Beauty", "Fitness", 
    "Lifestyle", "Home", "Food", "Books", "Art", "Other"
  ];

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Please fill in required fields");
      return;
    }
    try {
      const brandId = localStorage.getItem("userId");
      console.log("Adding product", { ...newProduct, brand: brandId });
      const res = await fetch("http://localhost:5000/api/products/brand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          images: newProduct.image ? [newProduct.image] : [],
          description: newProduct.description,
          category: newProduct.category,
          commission: parseFloat(newProduct.commission) || 10,
          brand: brandId,
          deliveryInstructions: ""
        })
      });
      if (!res.ok) {
        const data = await res.json();
        console.error("Failed to add product", data);
        throw new Error(data.message || "Failed to add product");
      }
      const product = await res.json();
      console.log("Product added", product);
      setProducts(prev => Array.isArray(prev) ? [...prev, product] : [product]);
      setNewProduct({
        name: "", price: "", stock: "", commission: "", 
        category: "", description: "", image: ""
      });
      setShowAddProduct(false);
      alert("Product added successfully!");
    } catch (err: any) {
      console.error("Error adding product", err);
      alert(err.message || "Failed to add product");
    }
  };

  // const handleApproveRequest = (requestId: number) => {
  //   setCreatorRequests(prev => 
  //     prev.map(req => 
  //       req.id === requestId 
  //         ? { ...req, status: "approved" }
  //         : req
  //     )
  //   );
  // };

  // const handleRejectRequest = (requestId: number) => {
  //   setCreatorRequests(prev => 
  //     prev.map(req => 
  //       req.id === requestId 
  //         ? { ...req, status: "rejected" }
  //         : req
  //     )
  //   );
  // };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      // Optionally call backend to delete
      setProducts(prev => prev.filter(p => p._id !== productId));
    }
  };
  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const brandId = localStorage.getItem("userId");
        const url = brandId
          ? `http://localhost:5000/api/products/brand?brand=${brandId}`
          : `http://localhost:5000/api/products/brand`;
        console.log("Fetching products for brand", brandId);
        const res = await fetch(url, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const data = await res.json();
        console.log("Fetched products", data);
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching products", err);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);


  // Handle brand profile update (PUT /api/brands/:id)
  const handleBrandProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const brandId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!brandId || !token) {
        alert("Not logged in");
        setUpdating(false);
        return;
      }
      const res = await fetch(`http://localhost:5000/api/brands/${brandId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(brandForm)
      });
      if (!res.ok) throw new Error("Failed to update brand");
      const data = await res.json();
      setBrand(data);
      setBrandForm({
        name: data.name || "",
        email: data.email || "",
        website: data.website || "",
        phone: data.phone || "",
        description: data.description || "",
        // avatar: data.avatar || ""
      });
      alert("Brand profile updated!");
    } catch (err) {
      alert("Error updating brand profile");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{brand?.name || "Brand Dashboard"}</h1>
          <p className="text-muted-foreground">{brand?.bio || "Manage your products and creator collaborations"}</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Profile & Brand Settings</h2>
            <Card>
              <CardHeader>
                <CardTitle>Edit Brand Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {brandForm && (
                  <form onSubmit={handleBrandProfileUpdate}>
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* <div>
                        <Avatar className="w-20 h-20 mb-2">
                          {brandForm.avatar ? (
                            <img src={brandForm.avatar} alt="avatar" className="w-20 h-20 rounded-full object-cover" />
                          ) : (
                            <AvatarFallback>{brandForm.name ? brandForm.name[0].toUpperCase() : "B"}</AvatarFallback>
                          )}
                        </Avatar>
                        <input
                          id="avatar-upload"
                          name="avatar"
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                setBrandForm((prev: any) => ({ ...prev, avatar: ev.target?.result }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          type="button"
                          onClick={() => document.getElementById("avatar-upload")?.click()}
                        >
                          Change Avatar
                        </Button>
                      </div> */}
                      <div className="flex-1 space-y-2">
                        <label className="block text-sm font-medium">Brand Name</label>
                        <input name="name" className="w-full border rounded px-3 py-2" type="text" placeholder="Brand name" value={brandForm.name} onChange={e => setBrandForm((prev: any) => ({ ...prev, name: e.target.value }))} />

                        <label className="block text-sm font-medium mt-2">Email</label>
                        <input name="email" className="w-full border rounded px-3 py-2" type="email" placeholder="Email" value={brandForm.email} onChange={e => setBrandForm((prev: any) => ({ ...prev, email: e.target.value }))} />

                        <label className="block text-sm font-medium mt-2">Website</label>
                        <input name="website" className="w-full border rounded px-3 py-2" type="text" placeholder="Website" value={brandForm.website} onChange={e => setBrandForm((prev: any) => ({ ...prev, website: e.target.value }))} />

                        <label className="block text-sm font-medium mt-2">Phone</label>
                        <input name="phone" className="w-full border rounded px-3 py-2" type="text" placeholder="Phone" value={brandForm.phone} onChange={e => setBrandForm((prev: any) => ({ ...prev, phone: e.target.value }))} />

                        <label className="block text-sm font-medium mt-2">Description</label>
                        <textarea name="bio" className="w-full border rounded px-3 py-2" rows={3} placeholder="Description" value={brandForm.bio} onChange={e => setBrandForm((prev: any) => ({ ...prev, bio: e.target.value }))} />

                        <div className="mt-6 flex gap-2">
                          <Button className="flex-1" type="submit" disabled={updating}>{updating ? "Saving..." : "Save Changes"}</Button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalProducts}</div>
                  <p className="text-xs text-muted-foreground">Active in marketplace</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Creators</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalCreators}</div>
                  <p className="text-xs text-muted-foreground">Promoting your products</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.conversionRate}%</div>
                  <p className="text-xs text-muted-foreground">+0.3% from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* <Card>
                <CardHeader>
                  <CardTitle>Recent Creator Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {creatorRequests.slice(0, 3).map((request) => (
                      <div key={request.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">{request.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-sm">{request.creator}</p>
                            <p className="text-xs text-muted-foreground">{request.product}</p>
                          </div>
                        </div>
                        <Badge variant={
                          request.status === "approved" ? "default" :
                          request.status === "rejected" ? "destructive" : "secondary"
                        }>
                          {request.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card> */}

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.slice(0, 3).map((product, index) => (
                      <div key={product.id} className="flex items-center space-x-4">
                        <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
                        <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{product.name}</h4>
                          <p className="text-xs text-muted-foreground">{product.totalSales} sales</p>
                        </div>
                        <span className="font-bold">${product.price}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Product Management</h2>
              <Button onClick={() => setShowAddProduct(!showAddProduct)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>

            {showAddProduct && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Add New Product</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="stock">Stock</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="commission">Commission (%)</Label>
                      <Input
                        id="commission"
                        type="number"
                        value={newProduct.commission}
                        onChange={(e) => setNewProduct({...newProduct, commission: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="image">Image URL</Label>
                      <Input
                        id="image"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddProduct}>Add Product</Button>
                    <Button variant="outline" onClick={() => setShowAddProduct(false)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loadingProducts ? <div>Loading products...</div> : safeProducts.map((product) => (
                <Card key={product._id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <Badge className="absolute top-2 left-2">{product.commission || 10}% Commission</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                    <Badge variant="outline">{product.category}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span>Price:</span>
                        <span className="font-bold">${product.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Stock:</span>
                        <span>{product.stock}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Creators:</span>
                        <span>{product.creatorsPromoting || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sales:</span>
                        <span>{product.sales || 0}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteProduct(product._id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Creator Requests */}
          {/* <TabsContent value="creators" className="space-y-6">
            <h2 className="text-2xl font-bold">Creator Collaboration Requests</h2>
            <div className="space-y-4">
              {creatorRequests.filter(r => r.status === "admin-approved").length === 0 ? (
                <div className="text-muted-foreground text-center py-8">No creator requests yet.</div>
              ) : (
                creatorRequests.filter(r => r.status === "admin-approved").map((request) => {
                  const creator = request.creatorId || {};
                  const product = request.productId || {};
                  return (
                    <Card key={request._id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback>{(creator.name && creator.name.split(" ").map(n => n[0]).join("").toUpperCase()) || "CR"}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{creator.name || "Creator"}</h3>
                              <p className="text-sm text-muted-foreground">{creator.email || "-"}</p>
                            </div>
                            <div className="text-center">
                              <p className="font-semibold">{product.name || "Product"}</p>
                              <p className="text-xs text-muted-foreground">Requested {new Date(request.createdAt).toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={
                              request.status === "approved" ? "default" :
                              request.status === "rejected" ? "destructive" : "secondary"
                            }>
                              {request.status}
                            </Badge>
                            {request.status === "admin-approved" && (
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  onClick={() => handleApproveRequest(request._id)}
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Approve
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleRejectRequest(request._id)}
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </TabsContent> */}

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics & Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Revenue</span>
                      <span className="font-bold">${stats.totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Orders</span>
                      <span className="font-bold">479</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Order Value</span>
                      <span className="font-bold">${(stats.totalRevenue / 479).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Creator Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Active Creators</span>
                      <span className="font-bold">{stats.totalCreators}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pending Requests</span>
                      <span className="font-bold">{creatorRequests.filter(r => r.status === "pending").length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Commission Paid</span>
                      <span className="font-bold">$12,450</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Best Seller</span>
                      <span className="font-bold">Water Bottle</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conversion Rate</span>
                      <span className="font-bold">{stats.conversionRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Return Rate</span>
                      <span className="font-bold">2.1%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BrandDashboard;
