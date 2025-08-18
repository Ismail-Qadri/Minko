// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Button } from "../../components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
// import { Badge } from "../../components/ui/badge";
// import { Avatar, AvatarFallback } from "../../components/ui/avatar";
// import {
//   Package, TrendingUp, DollarSign, Users, Plus,
//   ShoppingBag, Star, Clock, CheckCircle, XCircle,
//   Eye, Edit, Trash2, ExternalLink, Share2
// } from "lucide-react";
// import Navbar from "../Navbar";

// // Set axios base URL
// axios.defaults.baseURL = "http://localhost:5000";

// const CreatorDashboard = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("home");
//   const [user, setUser] = useState<any>(null);
//   const [myProducts, setMyProducts] = useState<any[]>([]);
//   const [brandProducts, setBrandProducts] = useState<any[]>([]);
//   const [pendingRequests, setPendingRequests] = useState<any[]>([]);
//   const [stats, setStats] = useState({
//     totalProducts: 0,
//     totalEarnings: 0,
//     totalViews: 0,
//     conversionRate: 0
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     fetchUserData();
//     fetchMyProducts();
//     fetchBrandProducts();
//     fetchStats();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("/api/creator", { 
//         headers: { Authorization: `Bearer ${token}` } 
//       });
//       setUser(response.data);
//     } catch (err) {
//       console.error("Error fetching user:", err);
//       navigate("/login");
//     }
//   };

//   const fetchMyProducts = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("/api/creator/products", { 
//         headers: { Authorization: `Bearer ${token}` } 
//       });
//       setMyProducts(response.data);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     }
//   };

//   const fetchBrandProducts = async () => {
//     // Mock brand products for now
//     setBrandProducts([
//       { 
//         id: 1, 
//         name: "Premium Wireless Headphones", 
//         brand: "TechBrand", 
//         price: 199, 
//         commission: 15, 
//         category: "Electronics",
//         image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300"
//       },
//       { 
//         id: 2, 
//         name: "Organic Skincare Set", 
//         brand: "BeautyBrand", 
//         price: 129, 
//         commission: 20, 
//         category: "Beauty",
//         image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300"
//       },
//       { 
//         id: 3, 
//         name: "Fitness Tracker Pro", 
//         brand: "FitnessCorp", 
//         price: 299, 
//         commission: 18, 
//         category: "Fitness",
//         image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300"
//       }
//     ]);
//   };

//   const fetchStats = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("/api/creator/stats", { 
//         headers: { Authorization: `Bearer ${token}` } 
//       });
//       setStats(response.data);
//     } catch (err) {
//       console.error("Error fetching stats:", err);
//     }
//   };

//   const handleRequestProduct = (productId: number) => {
//     // Add to pending requests
//     const product = brandProducts.find(p => p.id === productId);
//     if (product) {
//       setPendingRequests(prev => [...prev, {
//         id: Date.now(),
//         product: product.name,
//         brand: product.brand,
//         status: "pending",
//         requestedAt: "Just now"
//       }]);
//       alert("Product request sent for approval!");
//     }
//   };

//   const handleDeleteProduct = async (productId: string) => {
//     if (confirm("Are you sure you want to delete this product?")) {
//       try {
//         const token = localStorage.getItem("token");
//         await axios.delete(`/api/creator/products/${productId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         fetchMyProducts();
//       } catch (err) {
//         console.error("Error deleting product:", err);
//       }
//     }
//   };

//   const shareStore = () => {
//     const storeUrl = `${window.location.origin}/store/${user._id}`;
//     navigator.clipboard.writeText(storeUrl);
//     alert("Store link copied to clipboard!");
//   };

//   if (!user) return <div className="text-center mt-10">Loading dashboard...</div>;

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-8 flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold">Creator Dashboard</h1>
//             <p className="text-muted-foreground">Welcome back, {user.name}!</p>
//           </div>
//           <div className="flex gap-2">
//             <Button variant="outline" onClick={shareStore}>
//               <Share2 className="w-4 h-4 mr-2" />
//               Share Store
//             </Button>
//             <Button variant="outline" onClick={() => navigate(`/store/${user._id}`)}>
//               <ExternalLink className="w-4 h-4 mr-2" />
//               View Store
//             </Button>
//           </div>
//         </div>

//         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
//           <TabsList className="grid grid-cols-5 w-full max-w-2xl">
//             <TabsTrigger value="home">Overview</TabsTrigger>
//             <TabsTrigger value="products">My Products</TabsTrigger>
//             <TabsTrigger value="brands">Brand Products</TabsTrigger>
//             <TabsTrigger value="requests">Requests</TabsTrigger>
//             <TabsTrigger value="analytics">Analytics</TabsTrigger>
//           </TabsList>

//           {/* Overview */}
//           <TabsContent value="home" className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Total Products</CardTitle>
//                   <Package className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{stats.totalProducts}</div>
//                   <p className="text-xs text-muted-foreground">Active in your store</p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
//                   <DollarSign className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">${stats.totalEarnings}</div>
//                   <p className="text-xs text-muted-foreground">+12% from last month</p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Total Views</CardTitle>
//                   <Eye className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
//                   <p className="text-xs text-muted-foreground">Store visits this month</p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
//                   <TrendingUp className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{stats.conversionRate}%</div>
//                   <p className="text-xs text-muted-foreground">+0.5% from last month</p>
//                 </CardContent>
//               </Card>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Recent Products</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {myProducts.slice(0, 3).map((product) => (
//                       <div key={product._id} className="flex items-center space-x-4">
//                         <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
//                           {product.image ? (
//                             <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-md" />
//                           ) : (
//                             <Package className="w-6 h-6 text-gray-400" />
//                           )}
//                         </div>
//                         <div className="flex-1">
//                           <h4 className="font-semibold">{product.name}</h4>
//                           <p className="text-sm text-muted-foreground">${product.price}</p>
//                         </div>
//                         <Badge variant={product.status === "active" ? "default" : "secondary"}>
//                           {product.status}
//                         </Badge>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Quick Actions</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <Button onClick={() => navigate("/creator/add-product")} className="w-full">
//                     <Plus className="w-4 h-4 mr-2" />
//                     Add New Product
//                   </Button>
//                   <Button variant="outline" onClick={() => navigate(`/store/${user._id}`)} className="w-full">
//                     <ExternalLink className="w-4 h-4 mr-2" />
//                     View My Store
//                   </Button>
//                   <Button variant="outline" onClick={shareStore} className="w-full">
//                     <Share2 className="w-4 h-4 mr-2" />
//                     Share Store Link
//                   </Button>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           {/* My Products */}
//           <TabsContent value="products" className="space-y-6">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl font-bold">My Products</h2>
//               <Button onClick={() => navigate("/creator/add-product")}>
//                 <Plus className="w-4 h-4 mr-2" /> Add Product
//               </Button>
//             </div>
            
//             {myProducts.length === 0 ? (
//               <Card className="text-center py-12">
//                 <CardContent>
//                   <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
//                   <h3 className="text-lg font-semibold mb-2">No products yet</h3>
//                   <p className="text-muted-foreground mb-4">Start by adding your first product to your store.</p>
//                   <Button onClick={() => navigate("/creator/add-product")}>
//                     <Plus className="w-4 h-4 mr-2" />
//                     Add Your First Product
//                   </Button>
//                 </CardContent>
//               </Card>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {myProducts.map(product => (
//                   <Card key={product._id} className="overflow-hidden">
//                     <div className="aspect-square relative">
//                       {product.image ? (
//                         <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
//                       ) : (
//                         <div className="w-full h-full bg-gray-100 flex items-center justify-center">
//                           <Package className="w-12 h-12 text-gray-400" />
//                         </div>
//                       )}
//                       <Badge 
//                         className="absolute top-2 right-2"
//                         variant={product.status === "active" ? "default" : "secondary"}
//                       >
//                         {product.status}
//                       </Badge>
//                     </div>
//                     <CardHeader>
//                       <CardTitle className="line-clamp-1">{product.name}</CardTitle>
//                       <div className="flex items-center justify-between">
//                         <span className="text-2xl font-bold">${product.price}</span>
//                         <span className="text-sm text-muted-foreground">{product.sales || 0} sales</span>
//                       </div>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="flex gap-2">
//                         <Button variant="outline" size="sm" className="flex-1">
//                           <Edit className="w-3 h-3 mr-1" />
//                           Edit
//                         </Button>
//                         <Button 
//                           variant="outline" 
//                           size="sm" 
//                           onClick={() => handleDeleteProduct(product._id)}
//                           className="text-red-600 hover:text-red-700"
//                         >
//                           <Trash2 className="w-3 h-3" />
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </TabsContent>

//           {/* Brand Products */}
//           <TabsContent value="brands" className="space-y-6">
//             <h2 className="text-2xl font-bold">Brand Collaboration</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {brandProducts.map((product) => (
//                 <Card key={product.id} className="overflow-hidden">
//                   <div className="aspect-square relative">
//                     <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
//                     <Badge className="absolute top-2 left-2">{product.commission}% Commission</Badge>
//                   </div>
//                   <CardHeader>
//                     <CardTitle className="line-clamp-1">{product.name}</CardTitle>
//                     <p className="text-sm text-muted-foreground">by {product.brand}</p>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="flex justify-between items-center mb-4">
//                       <span className="text-xl font-bold">${product.price}</span>
//                       <Badge variant="outline">{product.category}</Badge>
//                     </div>
//                     <Button 
//                       onClick={() => handleRequestProduct(product.id)}
//                       className="w-full"
//                     >
//                       Request to Promote
//                     </Button>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>

//           {/* Requests */}
//           <TabsContent value="requests" className="space-y-6">
//             <h2 className="text-2xl font-bold">Product Requests</h2>
//             {pendingRequests.length === 0 ? (
//               <Card className="text-center py-12">
//                 <CardContent>
//                   <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
//                   <h3 className="text-lg font-semibold mb-2">No requests yet</h3>
//                   <p className="text-muted-foreground">Request products from brands to start collaborating.</p>
//                 </CardContent>
//               </Card>
//             ) : (
//               <div className="space-y-4">
//                 {pendingRequests.map((req) => (
//                   <Card key={req.id}>
//                     <CardContent className="p-6 flex justify-between items-center">
//                       <div>
//                         <h3 className="font-semibold">{req.product}</h3>
//                         <p className="text-sm text-muted-foreground">by {req.brand}</p>
//                         <p className="text-xs text-muted-foreground flex items-center mt-1">
//                           <Clock className="w-3 h-3 mr-1" /> Requested {req.requestedAt}
//                         </p>
//                       </div>
//                       <Badge variant={
//                         req.status === "approved" ? "default" :
//                         req.status === "rejected" ? "destructive" : "secondary"
//                       }>
//                         {req.status}
//                       </Badge>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </TabsContent>

//           {/* Analytics */}
//           <TabsContent value="analytics" className="space-y-6">
//             <h2 className="text-2xl font-bold">Analytics & Insights</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Performance Overview</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <div className="flex justify-between">
//                       <span>Store Views</span>
//                       <span className="font-bold">{stats.totalViews.toLocaleString()}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Product Views</span>
//                       <span className="font-bold">8,432</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Conversions</span>
//                       <span className="font-bold">156</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Revenue</span>
//                       <span className="font-bold">${stats.totalEarnings}</span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Top Products</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-3">
//                     {myProducts.slice(0, 3).map((product, index) => (
//                       <div key={product._id} className="flex items-center space-x-3">
//                         <span className="text-2xl font-bold text-muted-foreground">#{index + 1}</span>
//                         <div className="flex-1">
//                           <p className="font-semibold">{product.name}</p>
//                           <p className="text-sm text-muted-foreground">{product.sales || 0} sales</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default CreatorDashboard;






// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Button } from "../../components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
// import { Badge } from "../../components/ui/badge";
// import { Avatar, AvatarFallback } from "../../components/ui/avatar";
// import {
//   Package, TrendingUp, DollarSign, Users, Plus,
//   ShoppingBag, Star, Clock, CheckCircle, XCircle,
//   Eye, Edit, Trash2, ExternalLink, Share2
// } from "lucide-react";
// import Navbar from "../Navbar";

// // Set axios base URL
// axios.defaults.baseURL = "http://localhost:5000";

// const CreatorDashboard = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("home");
//   const [user, setUser] = useState<any>(null);
//   const [myProducts, setMyProducts] = useState<any[]>([]);
//   const [brandProducts, setBrandProducts] = useState<any[]>([]);
//   const [pendingRequests, setPendingRequests] = useState<any[]>([]);
//   const [stats, setStats] = useState({
//     totalProducts: 0,
//     totalEarnings: 0,
//     totalViews: 0,
//     conversionRate: 0
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     fetchUserData();
//     fetchMyProducts();
//     fetchBrandProducts();
//     fetchStats();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("/api/creator", { 
//         headers: { Authorization: `Bearer ${token}` } 
//       });
//       setUser(response.data);
//     } catch (err) {
//       console.error("Error fetching user:", err);
//       navigate("/login");
//     }
//   };

//   const fetchMyProducts = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("/api/creator/products", { 
//         headers: { Authorization: `Bearer ${token}` } 
//       });
//       setMyProducts(response.data);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     }
//   };

//   const fetchBrandProducts = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("/api/creator/brand-products", { 
//         headers: { Authorization: `Bearer ${token}` } 
//       });
//       setBrandProducts(response.data);
//     } catch (err) {
//       console.error("Error fetching brand products:", err);
//       // Fallback to mock data if API fails
//       setBrandProducts([
//         { 
//           id: 1, 
//           name: "Premium Wireless Headphones", 
//           brand: "TechBrand", 
//           price: 199, 
//           commission: 15,
//           category: "Electronics",
//           image: "https://via.placeholder.com/300x200"
//         },
//         { 
//           id: 2, 
//           name: "Organic Skincare Set", 
//           brand: "BeautyBrand", 
//           price: 129, 
//           commission: 20,
//           category: "Beauty",
//           image: "https://via.placeholder.com/300x200"
//         }
//       ]);
//     }
//   };

//   const fetchStats = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("/api/creator/stats", { 
//         headers: { Authorization: `Bearer ${token}` } 
//       });
//       setStats(response.data);
//     } catch (err) {
//       console.error("Error fetching stats:", err);
//     }
//   };

//   const handleRequestProduct = (productId: number) => {
//     // Add to pending requests
//     const product = brandProducts.find(p => p.id === productId);
//     if (product) {
//       setPendingRequests(prev => [...prev, {
//         id: Date.now(),
//         product: product.name,
//         brand: product.brand,
//         status: "pending",
//         requestedAt: "Just now"
//       }]);
//       alert("Product request sent for approval!");
//     }
//   };

//   const handleDeleteProduct = async (productId: string) => {
//     if (confirm("Are you sure you want to delete this product?")) {
//       try {
//         const token = localStorage.getItem("token");
//         await axios.delete(`/api/creator/products/${productId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         fetchMyProducts();
//       } catch (err) {
//         console.error("Error deleting product:", err);
//       }
//     }
//   };

//   const shareStore = () => {
//     const storeUrl = `${window.location.origin}/store/${user._id}`;
//     navigator.clipboard.writeText(storeUrl);
//     alert("Store link copied to clipboard!");
//   };

//   if (!user) return <div className="text-center mt-10">Loading dashboard...</div>;

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-8 flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold">Creator Dashboard</h1>
//             <p className="text-muted-foreground">Welcome back, {user.name}!</p>
//           </div>
//           <div className="flex gap-2">
//             <Button variant="outline" onClick={shareStore}>
//               <Share2 className="w-4 h-4 mr-2" />
//               Share Store
//             </Button>
//             <Button variant="outline" onClick={() => navigate(`/store/${user._id}`)}>
//               <ExternalLink className="w-4 h-4 mr-2" />
//               View Store
//             </Button>
//           </div>
//         </div>

//         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
//           <TabsList className="grid grid-cols-5 w-full max-w-2xl">
//             <TabsTrigger value="home">Overview</TabsTrigger>
//             <TabsTrigger value="products">My Products</TabsTrigger>
//             {/* <TabsTrigger value="brands">Brand Products</TabsTrigger> */}
//             <TabsTrigger value="requests">Requests</TabsTrigger>
//             <TabsTrigger value="analytics">Analytics</TabsTrigger>
//             <TabsTrigger value="settings">Settings</TabsTrigger>
//        </TabsList>

//           {/* Overview */}
//           <TabsContent value="home" className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Total Products</CardTitle>
//                   <Package className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{stats.totalProducts}</div>
//                   <p className="text-xs text-muted-foreground">Active in your store</p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
//                   <DollarSign className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">${stats.totalEarnings}</div>
//                   <p className="text-xs text-muted-foreground">+12% from last month</p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Total Views</CardTitle>
//                   <Eye className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
//                   <p className="text-xs text-muted-foreground">Store visits this month</p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
//                   <TrendingUp className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{stats.conversionRate}%</div>
//                   <p className="text-xs text-muted-foreground">+0.5% from last month</p>
//                 </CardContent>
//               </Card>
//             </div>

// {/* recent products */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Recent Products</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {myProducts.slice(0, 3).map((product) => (
//                       <div key={product._id} className="flex items-center space-x-4">
//                         <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
//                           {product.image ? (
//                             <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-md" />
//                           ) : (
//                             <Package className="w-6 h-6 text-gray-400" />
//                           )}
//                         </div>
//                         <div className="flex-1">
//                           <h4 className="font-semibold">{product.name}</h4>
//                           <p className="text-sm text-muted-foreground">${product.price}</p>
//                         </div>
//                         <Badge variant={product.status === "active" ? "default" : "secondary"}>
//                           {product.status}
//                         </Badge>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Quick Actions</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <Button onClick={() => navigate("/creator/add-product")} className="w-full">
//                     <Plus className="w-4 h-4 mr-2" />
//                     Add New Product
//                   </Button>
//                   <Button variant="outline" onClick={() => navigate(`/store/${user._id}`)} className="w-full">
//                     <ExternalLink className="w-4 h-4 mr-2" />
//                     View My Store
//                   </Button>
//                   <Button variant="outline" onClick={shareStore} className="w-full">
//                     <Share2 className="w-4 h-4 mr-2" />
//                     Share Store Link
//                   </Button>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Brand Collaboration */}
//             <h2 className="text-2xl font-bold">Brand Collaboration</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {brandProducts.map((product) => (
//                 <Card key={product.id} className="overflow-hidden">
//                   <div className="aspect-square relative">
//                     <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
//                     <Badge className="absolute top-2 left-2">{product.commission}% Commission</Badge>
//                   </div>
//                   <CardHeader>
//                     <CardTitle className="line-clamp-1">{product.name}</CardTitle>
//                     <p className="text-sm text-muted-foreground">by {product.brand}</p>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="flex justify-between items-center mb-4">
//                       <span className="text-xl font-bold">${product.price}</span>
//                       <Badge variant="outline">{product.category}</Badge>
//                     </div>
//                     <Button 
//                       onClick={() => handleRequestProduct(product.id)}
//                       className="w-full"
//                     >
//                       Request to Promote
//                     </Button>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>

//           {/* My Products */}
//           <TabsContent value="products" className="space-y-6">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl font-bold">My Products</h2>
//               <Button onClick={() => navigate("/creator/add-product")}>
//                 <Plus className="w-4 h-4 mr-2" /> Add Product
//               </Button>
//             </div>

//             {myProducts.length === 0 ? (
//               <Card className="text-center py-12">
//                 <CardContent>
//                   <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
//                   <h3 className="text-lg font-semibold mb-2">No products yet</h3>
//                   <p className="text-muted-foreground mb-4">Start by adding your first product to your store.</p>
//                   <Button onClick={() => navigate("/creator/add-product")}>
//                     <Plus className="w-4 h-4 mr-2" />
//                     Add Your First Product
//                   </Button>
//                 </CardContent>
//               </Card>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {myProducts.map(product => (
//                   <Card key={product._id} className="overflow-hidden">
//                     <div className="aspect-square relative">
//                       {product.image ? (
//                         <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
//                       ) : (
//                         <div className="w-full h-full bg-gray-100 flex items-center justify-center">
//                           <Package className="w-12 h-12 text-gray-400" />
//                         </div>
//                       )}
//                       <Badge 
//                         className="absolute top-2 right-2"
//                         variant={product.status === "active" ? "default" : "secondary"}
//                       >
//                         {product.status}
//                       </Badge>
//                     </div>
//                     <CardHeader>
//                       <CardTitle className="line-clamp-1">{product.name}</CardTitle>
//                       <div className="flex items-center justify-between">
//                         <span className="text-2xl font-bold">${product.price}</span>
//                         <span className="text-sm text-muted-foreground">{product.sales || 0} sales</span>
//                       </div>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="flex gap-2">
//                         <Button variant="outline" size="sm" className="flex-1">
//                           <Edit className="w-3 h-3 mr-1" />
//                           Edit
//                         </Button>
//                         <Button 
//                           variant="outline" 
//                           size="sm" 
//                           onClick={() => handleDeleteProduct(product._id)}
//                           className="text-red-600 hover:text-red-700"
//                         >
//                           <Trash2 className="w-3 h-3" />
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </TabsContent>

//           {/* Requests */}
//           <TabsContent value="requests" className="space-y-6">
//             <h2 className="text-2xl font-bold">Product Requests</h2>
//             {pendingRequests.length === 0 ? (
//               <Card className="text-center py-12">
//                 <CardContent>
//                   <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
//                   <h3 className="text-lg font-semibold mb-2">No requests yet</h3>
//                   <p className="text-muted-foreground">Request products from brands to start collaborating.</p>
//                 </CardContent>
//               </Card>
//             ) : (
//               <div className="space-y-4">
//                 {pendingRequests.map((req) => (
//                   <Card key={req.id}>
//                     <CardContent className="p-6 flex justify-between items-center">
//                       <div>
//                         <h3 className="font-semibold">{req.product}</h3>
//                         <p className="text-sm text-muted-foreground">by {req.brand}</p>
//                         <p className="text-xs text-muted-foreground flex items-center mt-1">
//                           <Clock className="w-3 h-3 mr-1" /> Requested {req.requestedAt}
//                         </p>
//                       </div>
//                       <Badge variant={
//                         req.status === "approved" ? "default" :
//                         req.status === "rejected" ? "destructive" : "secondary"
//                       }>
//                         {req.status}
//                       </Badge>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </TabsContent>

//  {/* Brand Products */}
//           <TabsContent value="brands" className="space-y-6">
            
//           </TabsContent>
     
//           {/* Settings */}
// <TabsContent value="settings" className="space-y-6">
//   <h2 className="text-2xl font-bold">Settings</h2>
//   <p className="text-muted-foreground">
//     Manage your account settings and preferences.
//   </p>

//   {/* Nested Tabs */}
//   <Tabs defaultValue="edit-profile" className="mt-4">
//     {/* Sub Tabs List */}
//     <TabsList>
//       <TabsTrigger value="edit-profile">Edit Profile</TabsTrigger>
//       <TabsTrigger value="account-details">Account Details</TabsTrigger>
//       <TabsTrigger value="change-password">Change Password</TabsTrigger>
//     </TabsList>

//     {/* Sub Tabs Content */}
//     <TabsContent value="edit-profile" className="space-y-4">
//       <h3 className="text-lg font-semibold">Edit Profile</h3>
//       <p className="text-sm text-muted-foreground">
//         Update your personal information here.
//       </p>
//       {/* Your Edit Profile Form goes here */}
//     </TabsContent>

//     <TabsContent value="account-details" className="space-y-4">
//       <h3 className="text-lg font-semibold">Account Details</h3>
//       <p className="text-sm text-muted-foreground">
//         View and update your account details.
//       </p>
//       {/* Your Account Details content goes here */}
//     </TabsContent>

//     <TabsContent value="change-password" className="space-y-4">
//       <h3 className="text-lg font-semibold">Change Password</h3>
//       <p className="text-sm text-muted-foreground">
//         Secure your account by changing your password.
//       </p>
//       {/* Your Change Password form goes here */}
//     </TabsContent>
//   </Tabs>
// </TabsContent>


//           {/* Analytics */}
//           <TabsContent value="analytics" className="space-y-6">
//             <h2 className="text-2xl font-bold">Analytics & Insights</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Performance Overview</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <div className="flex justify-between">
//                       <span>Store Views</span>
//                       <span className="font-bold">{stats.totalViews.toLocaleString()}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Product Views</span>
//                       <span className="font-bold">8,432</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Conversions</span>
//                       <span className="font-bold">156</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Revenue</span>
//                       <span className="font-bold">${stats.totalEarnings}</span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Top Products</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-3">
//                     {myProducts.slice(0, 3).map((product, index) => (
//                       <div key={product._id} className="flex items-center space-x-3">
//                         <span className="text-2xl font-bold text-muted-foreground">#{index + 1}</span>
//                         <div className="flex-1">
//                           <p className="font-semibold">{product.name}</p>
//                           <p className="text-sm text-muted-foreground">{product.sales || 0} sales</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };


// export default CreatorDashboard;





import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  Package, TrendingUp, DollarSign, Users, Plus,
  Eye, Edit, Trash2, ExternalLink, Share2, Clock,
  ShoppingBag
} from "lucide-react";

// Set axios base URL
axios.defaults.baseURL = "http://localhost:5000";

const CreatorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("home");
  const [loading, setLoading] = useState(true);
  
  // State management
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchUserData(),
        fetchMyProducts(),
        fetchBrandProducts(),
        fetchStats(),
        fetchPendingRequests()
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/creator", { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setUser(response.data);
    } catch (err) {
      console.error("Error fetching user:", err);
      navigate("/login");
    }
  };

  const fetchMyProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/creator/products", { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setMyProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchBrandProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/creator/brand-products", { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setBrandProducts(response.data);
    } catch (err) {
      console.error("Error fetching brand products:", err);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/creator/stats", { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setStats(response.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const fetchPendingRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/creator/requests", { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setPendingRequests(response.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  const handleRequestProduct = async (productId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`/api/creator/request-product/${productId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast({
        title: "Success",
        description: "Product request sent for approval!"
      });
      
      fetchPendingRequests();
    } catch (error: any) {
      console.error("Error requesting product:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to send request",
        variant: "destructive"
      });
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/creator/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast({
        title: "Success",
        description: "Product deleted successfully"
      });
      
      fetchMyProducts();
      fetchStats();
    } catch (err) {
      console.error("Error deleting product:", err);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive"
      });
    }
  };

  const shareStore = () => {
    if (user) {
      const storeUrl = `${window.location.origin}/store/${user._id}`;
      navigator.clipboard.writeText(storeUrl);
      toast({
        title: "Success",
        description: "Store link copied to clipboard!"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brand-text-light">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-brand-text-light">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary"></div>
                <span className="text-xl font-bold text-brand-text">MINKO</span>
              </div>
              <Badge variant="secondary" className="bg-brand-accent/10 text-brand-accent border-brand-accent/20">
                Creator Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback className="bg-brand-primary text-white">
                  {user.name?.split(' ').map((n: string) => n[0]).join('') || 'CR'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-brand-text">{user.name}</p>
                <p className="text-sm text-brand-text-light">@{user.username}</p>
              </div>
              <Button variant="outline" onClick={() => navigate("/")}>Logout</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-brand-text">Creator Dashboard</h1>
            <p className="text-brand-text-light">Welcome back, {user.name}!</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={shareStore} className="border-brand-primary/20">
              <Share2 className="w-4 h-4 mr-2" />
              Share Store
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate(`/store/${user._id}`)}
              className="border-brand-primary/20"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Store
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl bg-muted/50">
            <TabsTrigger value="home" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">My Products</TabsTrigger>
            <TabsTrigger value="requests" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">Requests</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="home" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-card to-muted/50 border-brand-primary/20 hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-brand-text">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-brand-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-brand-text">{stats.totalProducts}</div>
                  <p className="text-xs text-brand-text-light">Active in your store</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-card to-muted/50 border-brand-primary/20 hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-brand-text">Total Earnings</CardTitle>
                  <DollarSign className="h-4 w-4 text-brand-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-brand-text">${stats.totalEarnings}</div>
                  <p className="text-xs text-green-600">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-card to-muted/50 border-brand-primary/20 hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-brand-text">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-brand-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-brand-text">{stats.totalViews.toLocaleString()}</div>
                  <p className="text-xs text-brand-text-light">Store visits this month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-card to-muted/50 border-brand-primary/20 hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-brand-text">Conversion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-brand-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-brand-text">{stats.conversionRate}%</div>
                  <p className="text-xs text-green-600">+0.5% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent products and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-brand-primary/20">
                <CardHeader>
                  <CardTitle className="text-brand-text">Recent Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myProducts.slice(0, 3).map((product) => (
                      <div key={product._id} className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-md flex items-center justify-center">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-md" />
                          ) : (
                            <Package className="w-6 h-6 text-brand-primary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-brand-text">{product.name}</h4>
                          <p className="text-sm text-brand-text-light">${product.price}</p>
                        </div>
                        <Badge variant={product.status === "active" ? "default" : "secondary"} className="bg-brand-primary text-white">
                          {product.status}
                        </Badge>
                      </div>
                    ))}
                    {myProducts.length === 0 && (
                      <div className="text-center py-4 text-brand-text-light">
                        No products yet
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-brand-primary/20">
                <CardHeader>
                  <CardTitle className="text-brand-text">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button onClick={() => navigate("/creator/add-product")} className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Product
                  </Button>
                  <Button variant="outline" onClick={() => navigate(`/store/${user._id}`)} className="w-full border-brand-primary/20">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View My Store
                  </Button>
                  <Button variant="outline" onClick={shareStore} className="w-full border-brand-primary/20">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Store Link
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Brand Collaboration */}
            <div>
              <h2 className="text-2xl font-bold text-brand-text mb-6">Brand Collaboration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {brandProducts.map((product) => (
                  <Card key={product._id} className="overflow-hidden border-brand-primary/20 hover:shadow-lg transition-all duration-300">
                    <div className="aspect-square relative">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 flex items-center justify-center">
                          <Package className="w-12 h-12 text-brand-primary" />
                        </div>
                      )}
                      <Badge className="absolute top-2 left-2 bg-brand-primary text-white">
                        {product.commission}% Commission
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-1 text-brand-text">{product.name}</CardTitle>
                      <p className="text-sm text-brand-text-light">by {product.brand?.name || 'Brand'}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-bold text-brand-text">${product.price}</span>
                        <Badge variant="outline" className="border-brand-primary/20 text-brand-text">
                          {product.category}
                        </Badge>
                      </div>
                      <Button 
                        onClick={() => handleRequestProduct(product._id)}
                        className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white"
                        disabled={pendingRequests.some(req => req.product?._id === product._id)}
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        {pendingRequests.some(req => req.product?._id === product._id) ? 'Request Sent' : 'Request to Promote'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                {brandProducts.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <Package className="w-12 h-12 mx-auto mb-4 text-brand-primary" />
                    <h3 className="text-lg font-semibold mb-2 text-brand-text">No brand products available</h3>
                    <p className="text-brand-text-light">Check back later for brand collaboration opportunities.</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* My Products */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-brand-text">My Products</h2>
              <Button 
                onClick={() => navigate("/creator/add-product")}
                className="bg-brand-primary hover:bg-brand-primary/90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Product
              </Button>
            </div>

            {myProducts.length === 0 ? (
              <Card className="text-center py-12 border-brand-primary/20">
                <CardContent>
                  <Package className="w-12 h-12 mx-auto mb-4 text-brand-primary" />
                  <h3 className="text-lg font-semibold mb-2 text-brand-text">No products yet</h3>
                  <p className="text-brand-text-light mb-4">Start by adding your first product to your store.</p>
                  <Button 
                    onClick={() => navigate("/creator/add-product")}
                    className="bg-brand-primary hover:bg-brand-primary/90 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Product
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myProducts.map(product => (
                  <Card key={product._id} className="overflow-hidden border-brand-primary/20 hover:shadow-lg transition-all duration-300">
                    <div className="aspect-square relative">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 flex items-center justify-center">
                          <Package className="w-12 h-12 text-brand-primary" />
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
                      <CardTitle className="line-clamp-1 text-brand-text">{product.name}</CardTitle>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-brand-text">${product.price}</span>
                        <span className="text-sm text-brand-text-light">{product.sales || 0} sales</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 border-brand-primary/20">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteProduct(product._id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
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

          {/* Requests */}
          <TabsContent value="requests" className="space-y-6">
            <h2 className="text-2xl font-bold text-brand-text">Product Requests</h2>
            {pendingRequests.length === 0 ? (
              <Card className="text-center py-12 border-brand-primary/20">
                <CardContent>
                  <Clock className="w-12 h-12 mx-auto mb-4 text-brand-primary" />
                  <h3 className="text-lg font-semibold mb-2 text-brand-text">No requests yet</h3>
                  <p className="text-brand-text-light">Request products from brands to start collaborating.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((req) => (
                  <Card key={req._id} className="border-brand-primary/20">
                    <CardContent className="p-6 flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-brand-text">{req.product?.name}</h3>
                        <p className="text-sm text-brand-text-light">by {req.product?.brand?.name || 'Brand'}</p>
                        <p className="text-xs text-brand-text-light flex items-center mt-1">
                          <Clock className="w-3 h-3 mr-1" /> 
                          Requested {new Date(req.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={
                        req.status === "approved" ? "default" :
                        req.status === "rejected" ? "destructive" : "secondary"
                      } className={
                        req.status === "approved" ? "bg-green-600 text-white" :
                        req.status === "rejected" ? "" : "bg-yellow-500 text-white"
                      }>
                        {req.status}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-brand-text">Analytics & Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-brand-primary/20">
                <CardHeader>
                  <CardTitle className="text-brand-text">Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-brand-text-light">Store Views</span>
                      <span className="font-bold text-brand-text">{stats.totalViews.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-text-light">Product Views</span>
                      <span className="font-bold text-brand-text">8,432</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-text-light">Conversions</span>
                      <span className="font-bold text-brand-text">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-text-light">Revenue</span>
                      <span className="font-bold text-brand-text">${stats.totalEarnings}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-brand-primary/20">
                <CardHeader>
                  <CardTitle className="text-brand-text">Top Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {myProducts.slice(0, 3).map((product, index) => (
                      <div key={product._id} className="flex items-center space-x-3">
                        <span className="text-2xl font-bold text-brand-primary">#{index + 1}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-brand-text">{product.name}</p>
                          <p className="text-sm text-brand-text-light">{product.sales || 0} sales</p>
                        </div>
                      </div>
                    ))}
                    {myProducts.length === 0 && (
                      <div className="text-center py-4 text-brand-text-light">
                        No products to display
                      </div>
                    )}
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