
import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import {
  Package, TrendingUp, DollarSign, Users, Plus,
  ShoppingBag, Star, Clock, CheckCircle, XCircle,
  Eye, Edit, Trash2, ExternalLink, Share2
} from "lucide-react";
import Navbar from "../Navbar";

// Set axios base URL
axios.defaults.baseURL = "http://localhost:5000";

const CreatorDashboard = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("home");
  const [user, setUser] = useState<any>(null);
  const [myProducts, setMyProducts] = useState<any[]>([]);
  const [brandProducts, setBrandProducts] = useState<any[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalEarnings: 0,
    totalViews: 0,
    conversionRate: 0
  });

// Handle account deletion (now inside component)
const handleDeleteAccount = async () => {
  if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;
  try {
    const id = user?._id || localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!id || !token) {
      alert("Not logged in");
      return;
    }
    await axios.delete(`/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    alert("Account deleted successfully.");
    navigate("/register");
  } catch (err) {
    console.error("❌ Error deleting account:", err);
    alert("Error deleting account. Please try again later.");
  }
};

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchUserData();
    fetchMyProducts();
    fetchBrandProducts();
    // fetchStats();
    fetchRequests();
  }, [userId]);

  // Refetch products if returning from add-product page
  // Use location from react-router to detect path change

  const location = useLocation();
  useEffect(() => {
    if (location.pathname.endsWith("/creator/dashboard")) {
      fetchMyProducts();
    }
  }, [location.pathname]);

    // Handle profile update with FormData (avatar + all fields)
  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userId = user?._id || localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId) {
        alert("No userId found. Please log in again.");
        console.error("[handleProfileUpdate] No userId found. user:", user, "localStorage.userId:", localStorage.getItem("userId"));
        return;
      }
      if (!token) {
        alert("Not logged in");
        return;
      }
      const form = e.currentTarget;
      const formData = new FormData(form);
      // If no avatar selected, remove from FormData
      if (!(form.elements.namedItem("avatar") as HTMLInputElement)?.files?.length) {
        formData.delete("avatar");
      }
      const url = `/api/users/${userId}`;
      console.log(`[handleProfileUpdate] PUT URL: ${url}`);
      const res = await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
      }
      alert("Profile updated!");
    } catch (err) {
      console.error("❌ Error updating profile (multipart):", err);
      if (axios.isAxiosError(err) && err.response) {
        alert(`Error updating profile: ${err.response.status} ${err.response.statusText}`);
      } else {
        alert("Error updating profile");
      }
    }
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const id = userId || localStorage.getItem("userId");
      if (!id) throw new Error("No userId found");
      console.log('[CreatorDashboard] Fetching user data for:', id);
      const response = await axios.get(`/api/creator/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('[CreatorDashboard] User data fetched:', response.data);
      setUser(response.data);
    } catch (err) {
      console.error("[CreatorDashboard] Error fetching user:", err);
      navigate("/login");
    }
  };

  const fetchMyProducts = async () => {
    try {
      const creatorId = userId || localStorage.getItem("userId");
      console.log('[fetchMyProducts] creatorId:', creatorId);
      if (!creatorId || typeof creatorId !== 'string' || creatorId.length !== 24) {
        console.error(`[fetchMyProducts] Invalid or missing creatorId: ${creatorId}`);
        setMyProducts([]);
        return;
      }
      // Fetch creator's own products
      const ownRes = await axios.get(`/api/products/creator?creator=${creatorId}`);
      const ownProducts = Array.isArray(ownRes.data) ? ownRes.data : [];

      // Fetch brand-approved requests for this creator
      const approvedRes = await axios.get(`/api/brand-requests?creatorId=${creatorId}&status=brand-approved`);
      const approvedRequests = Array.isArray(approvedRes.data) ? approvedRes.data : [];
      // Extract product objects from approved requests (may be populated)
      const approvedProducts = approvedRequests
        .map(r => r.productId)
        .filter(p => p && p._id); // filter out nulls

      // Combine own products and approved brand products, avoiding duplicates
      const allProductsMap = new Map();
      ownProducts.forEach(p => allProductsMap.set(p._id, p));
      approvedProducts.forEach(p => allProductsMap.set(p._id, p));
      const allProducts = Array.from(allProductsMap.values());

      setMyProducts(allProducts);
    } catch (err) {
      console.error('[CreatorDashboard] Error fetching my products:', err);
      setMyProducts([]);
    }
  };

  const fetchBrandProducts = async () => {
    try {
      console.log('[CreatorDashboard] Fetching brand products...');
      const res = await axios.get("/api/products/brand");
      const products = Array.isArray(res.data) ? res.data : [];
      console.log('[CreatorDashboard] Brand products fetched:', products);
      setBrandProducts(products);
    } catch (err) {
      console.error('[CreatorDashboard] Error fetching brand products:', err);
      setBrandProducts([]);
    }
  };

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      let id = userId || localStorage.getItem("userId");
      if (!id || typeof id !== 'string' || id.length !== 24) {
        console.error(`[fetchRequests] Invalid or missing creatorId: ${id}`);
        setPendingRequests([]);
        return;
      }
      id = String(id); // Ensure it's a string
      console.log('[CreatorDashboard] Fetching brand requests for creatorId:', id);
      const res = await axios.get(`/api/brand-requests?creatorId=${id}`,
        { headers: { Authorization: `Bearer ${token}` } });
      const requests = Array.isArray(res.data) ? res.data : [];
      console.log('[CreatorDashboard] Brand requests fetched:', requests);
      setPendingRequests(requests);
    } catch (err) {
      console.error('[CreatorDashboard] Error fetching brand requests:', err);
      setPendingRequests([]);
    }
  };

  // const fetchStats = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     console.log('[CreatorDashboard] Fetching stats...');
  //     const response = await axios.get("/api/creator/stats", { 
  //       headers: { Authorization: `Bearer ${token}` } 
  //     });
  //     console.log('[CreatorDashboard] Stats fetched:', response.data);
  //     setStats(response.data);
  //   } catch (err) {
  //     console.error('[CreatorDashboard] Error fetching stats:', err);
  //   }
  // };

  const handleRequestProduct = async (productId) => {
    const token = localStorage.getItem("token");
    const creatorId = userId || localStorage.getItem("userId");
    const product = brandProducts.find((p) => p._id === productId);

    if (!product) {
      alert("Product not found.");
      return;
    }
    if (!product.brand) {
      alert("This product does not have a valid brand ID.");
      return;
    }
    if (!creatorId) {
      alert("No creatorId found.");
      return;
    }

    try {
      await axios.post("/api/brand-requests", {
        productId,
        brandId: product.brand, // <-- use 'brand' field
        creatorId,
        creatorName: user?.name || "",
        message: "I'd like to promote this product!"
      }, { headers: { Authorization: `Bearer ${token}` } });
      fetchRequests();
      alert("Product request sent for approval!");
    } catch (err) {
      console.error("Error sending product request:", err);
      alert("Failed to send product request. Please try again.");
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/api/products/creator/${productId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchMyProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  const shareStore = () => {
    const id = userId || (user && user._id);
    const storeUrl = `${window.location.origin}/store/${id}`;
    navigator.clipboard.writeText(storeUrl);
    alert("Store link copied to clipboard!");
  };

  if (!user) return <div className="text-center mt-10">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Creator Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}!</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={shareStore}>
              <Share2 className="w-4 h-4 mr-2" />
              Share Store
            </Button>
            <Button variant="outline" onClick={() => navigate(`/store/${user._id}`)}>
              <ExternalLink className="w-4 h-4 mr-2" />
              View Store
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl">
            <TabsTrigger value="home">Overview</TabsTrigger>
            <TabsTrigger value="products">My Products</TabsTrigger>
            <TabsTrigger value="brands">Brand Products</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            {/* <TabsTrigger value="analytics">Analytics</TabsTrigger> */}
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          {/* Profile */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Profile & Bank Settings</h2>
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile & Bank Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleProfileUpdate} encType="multipart/form-data">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div>
                      <Avatar className="w-20 h-20 mb-2">
                        {user?.avatarPreview ? (
                          <img src={user.avatarPreview as string} alt="avatar-preview" className="w-20 h-20 rounded-full object-cover" />
                        ) : user?.avatar ? (
                          <img src={user.avatar} alt="avatar" className="w-20 h-20 rounded-full object-cover" />
                        ) : (
                          <AvatarFallback>{user?.name ? user.name.split(" ").map(n => n[0]).join("").toUpperCase() : "U"}</AvatarFallback>
                        )}
                      </Avatar>
                      <input
                        id="avatar-upload"
                        name="avatar"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              setUser((prev) => ({ ...prev, avatarPreview: ev.target?.result }));
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
                    </div>
                    <div className="flex-1 space-y-2">
                      <label className="block text-sm font-medium">Full Name</label>
                      <input name="name" className="w-full border rounded px-3 py-2" type="text" placeholder="Enter full name" defaultValue={user?.name || ""} />

                      <label className="block text-sm font-medium mt-2">Email</label>
                      <input name="email" className="w-full border rounded px-3 py-2" type="email" placeholder="Enter your email" defaultValue={user?.email || ""} />

                      <label className="block text-sm font-medium mt-2">Date of Birth</label>
                      <input name="dob" className="w-full border rounded px-3 py-2" type="date" placeholder="" defaultValue={user?.dob ? user.dob.substring(0,10) : ""} />

                      <label className="block text-sm font-medium mt-2">Gender</label>
                      <select name="gender" className="w-full border rounded px-3 py-2" defaultValue={user?.gender || ""}>
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>

                      <label className="block text-sm font-medium mt-2">Phone Number</label>
                      <input name="phone" className="w-full border rounded px-3 py-2" type="tel" placeholder="Enter phone number" defaultValue={user?.phone || ""} />

                      <label className="block text-sm font-medium mt-2">Website</label>
                      <input name="website" className="w-full border rounded px-3 py-2" type="text" placeholder="Your website URL" defaultValue={user?.website || ""} />

                      <label className="block text-sm font-medium mt-2">Instagram Profile</label>
                      <input name="instagram" className="w-full border rounded px-3 py-2" type="text" placeholder="Your Instagram" defaultValue={user?.instagram || ""} />

                      <label className="block text-sm font-medium mt-2">YouTube Channel</label>
                      <input name="youtube" className="w-full border rounded px-3 py-2" type="text" placeholder="Your YouTube channel" defaultValue={user?.youtube || ""} />

                      <label className="block text-sm font-medium mt-2">Bio</label>
                      <textarea name="bio" className="w-full border rounded px-3 py-2" rows={3} placeholder="Tell us about yourself..." defaultValue={user?.bio || ""} />

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium">Address Line 1</label>
                          <input name="addressLine1" className="w-full border rounded px-3 py-2" type="text" placeholder="Address Line 1" defaultValue={user?.addressLine1 || ""} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Address Line 2</label>
                          <input name="addressLine2" className="w-full border rounded px-3 py-2" type="text" placeholder="Address Line 2" defaultValue={user?.addressLine2 || ""} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">City</label>
                          <input name="city" className="w-full border rounded px-3 py-2" type="text" placeholder="City" defaultValue={user?.city || ""} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">State</label>
                          <input name="state" className="w-full border rounded px-3 py-2" type="text" placeholder="State" defaultValue={user?.state || ""} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Zip Code</label>
                          <input name="zip" className="w-full border rounded px-3 py-2" type="text" placeholder="Zip Code" defaultValue={user?.zip || ""} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Country</label>
                          <input name="country" className="w-full border rounded px-3 py-2" type="text" placeholder="Country" defaultValue={user?.country || ""} />
                        </div>
                      </div>

                      {/* Bank & Payout Fields */}
                      <h2 className="form-title mt-6">Bank & Payout Details</h2>
                      <label className="block text-sm font-medium">Bank Name</label>
                      <input name="bankName" className="w-full border rounded px-3 py-2 mb-2" placeholder="Bank Name" defaultValue={user?.bankName || ""} />
                      <label className="block text-sm font-medium">Account Number</label>
                      <input name="accountNumber" className="w-full border rounded px-3 py-2 mb-2" placeholder="Account Number" defaultValue={user?.accountNumber || ""} />
                      <label className="block text-sm font-medium">IFSC Code</label>
                      <input name="ifscCode" className="w-full border rounded px-3 py-2 mb-2" placeholder="IFSC Code" defaultValue={user?.ifscCode || ""} />
                      <label className="block text-sm font-medium">Branch</label>
                      <input name="branch" className="w-full border rounded px-3 py-2 mb-2" placeholder="Branch" defaultValue={user?.branch || ""} />
                      <label className="block text-sm font-medium mt-4">Bank Account / UPI ID</label>
                      <input name="payoutAccount" className="w-full border rounded px-3 py-2 mb-2" type="text" placeholder="Enter your payout details..." defaultValue={user?.payoutAccount || ""} />
                      <label className="block text-sm font-medium mt-2">PAN / Tax ID</label>
                      <input name="pan" className="w-full border rounded px-3 py-2 mb-2" type="text" placeholder="Enter your PAN or Tax ID..." defaultValue={user?.pan || ""} />
                      <label className="block text-sm font-medium mt-2">Aadhar Number</label>
                      <input name="aadharNumber" className="w-full border rounded px-3 py-2 mb-2" type="text" placeholder="Enter your Aadhar Number" defaultValue={user?.aadharNumber || ""} />

                      <div className="mt-6 flex gap-2">
                        <Button className="flex-1" type="submit">Submit Changes</Button>
                        <Button variant="destructive" className="flex-1" size="sm" type="button" onClick={handleDeleteAccount}>Delete Account</Button>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
            {/* Footer with Help Section */}
            <footer className="mt-12 py-8 border-t text-center text-muted-foreground bg-gray-50">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-lg font-semibold mb-2">❓ Need Help? Contact Support</h2>
                <ul className="list-none mb-4">
                  <li>✉️ <strong>Email:</strong> support@example.com</li>
                  <li>💬 <strong>Live Chat:</strong> Click the chat icon (bottom-right corner).</li>
                  <li>☎️ <strong>Call:</strong> +1 (800) 123-4567 (Mon–Fri, 9 AM–6 PM IST)</li>
                </ul>
                <div className="text-xs text-gray-400 mt-4">
                  &copy; {new Date().getFullYear()} Minko Creative. All rights reserved. | Built with passion for creators & brands.
                </div>
              </div>
            </footer>
          </TabsContent>

          {/* Overview */}
          <TabsContent value="home" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalProducts}</div>
                  <p className="text-xs text-muted-foreground">Active in your store</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.totalEarnings}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Store visits this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.conversionRate}%</div>
                  <p className="text-xs text-muted-foreground">+0.5% from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myProducts && myProducts.length > 0 ? (
                      myProducts.slice(0, 3).map((product) => (
                        <div key={product._id} className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                            {product.image ? (
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-md" />
                            ) : (
                              <Package className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{product.name}</h4>
                            <p className="text-sm text-muted-foreground">${product.price}</p>
                          </div>
                          <Badge variant={product.status === "active" ? "default" : "secondary"}>
                            {product.status}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <div className="text-muted-foreground">No recent products</div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button onClick={() => navigate("/creator/add-product")} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Product
                  </Button>
                  <Button variant="outline" onClick={() => navigate(`/store/${user._id}`)} className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View My Store
                  </Button>
                  <Button variant="outline" onClick={shareStore} className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Store Link
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* My Products */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Products</h2>
              <Button onClick={() => navigate("/creator/add-product")}>
                <Plus className="w-4 h-4 mr-2" /> Add Product
              </Button>
            </div>
            
            {myProducts.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No products yet</h3>
                  <p className="text-muted-foreground mb-4">Start by adding your first product to your store.</p>
                  <Button onClick={() => navigate("/creator/add-product")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Product
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myProducts.map(product => (
                  <Card key={product._id} className="overflow-hidden">
                    <div className="aspect-square relative">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <Package className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      <Badge 
                        className="absolute top-2 right-2"
                        variant={product.status === "active" ? "default" : "secondary"}
                      >
                        {product.status}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">${product.price}</span>
                        <span className="text-sm text-muted-foreground">{product.sales || 0} sales</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                       
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => navigate(`/creator/edit-product/${product._id}`)}
                          className="flex-1"
                        >
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
            )}
          </TabsContent>

          {/* Brand Products */}
          <TabsContent value="brands" className="space-y-6">
            <h2 className="text-2xl font-bold">Brand Collaboration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brandProducts.map((product) => (
                <Card key={product._id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <Badge className="absolute top-2 left-2">{product.commission}% Commission</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">by {product.brand}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold">${product.price}</span>
                      <Badge variant="outline">{product.category}</Badge>
                    </div>
                    <Button 
                      onClick={() => handleRequestProduct(product._id)}
                      className="w-full"
                    >
                      Request to Promote
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Requests */}
          <TabsContent value="requests" className="space-y-6">
            <h2 className="text-2xl font-bold">Product Requests</h2>
            {pendingRequests.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No requests yet</h3>
                  <p className="text-muted-foreground">Request products from brands to start collaborating.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingRequests.map((req) => {
                  const product = req.productId || {};
                  return (
                    <Card key={req._id} className="overflow-hidden">
                      <div className="aspect-square relative">
                        {product.image ? (
                          <img src={Array.isArray(product.image) ? product.image[0] : product.image} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <Package className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                        <Badge className="absolute top-2 right-2" variant={req.status === "pending" ? "default" : "secondary"}>
                          {req.status === "pending" ? "Pending" : req.status}
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="line-clamp-1">{product.name || "Product"}</CardTitle>
                        <div className="flex flex-col gap-1">
                          <span className="text-lg font-semibold">Price: ${product.price || "-"}</span>
                          <span className="text-md">Quantity: {product.quantity !== undefined ? product.quantity : "-"}</span>
                          <span className="text-sm text-muted-foreground">Category: {product.category || "-"}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-2">
                          <span className="text-sm text-muted-foreground">by {req.brandId?.name || req.brandId || "Brand"}</span>
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="w-3 h-3 mr-1" /> Requested {new Date(req.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics & Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Store Views</span>
                      <span className="font-bold">{stats.totalViews.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Product Views</span>
                      <span className="font-bold">8,432</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conversions</span>
                      <span className="font-bold">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue</span>
                      <span className="font-bold">${stats.totalEarnings}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {myProducts.slice(0, 3).map((product, index) => (
                      <div key={product._id} className="flex items-center space-x-3">
                        <span className="text-2xl font-bold text-muted-foreground">#{index + 1}</span>
                        <div className="flex-1">
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.sales || 0} sales</p>
                        </div>
                      </div>
                    ))}
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

export default CreatorDashboard;
