// // import { useState } from "react";
// // import { Button } from "../../components/ui/button";
// // import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
// // import { Badge } from "../../components/ui/badge";
// // import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
// // import { 
// //   Package, 
// //   TrendingUp, 
// //   DollarSign, 
// //   Users, 
// //   Plus, 
// //   ShoppingBag,
// //   Star,
// //   Clock,
// //   CheckCircle,
// //   XCircle
// // } from "lucide-react";
// // import { useNavigate } from "react-router-dom";

// // const CreatorDashboard = () => {
// //   const navigate = useNavigate();
// //   const [activeTab, setActiveTab] = useState("overview");

// //   // Mock data
// //   const stats = {
// //     totalProducts: 12,
// //     totalEarnings: 2450,
// //     totalViews: 15600,
// //     conversionRate: 3.2
// //   };

// //   const myProducts = [
// //     { id: 1, name: "Skincare Bundle", price: 89, sales: 23, status: "active" },
// //     { id: 2, name: "Workout Gear", price: 156, sales: 12, status: "active" },
// //     { id: 3, name: "Tech Accessories", price: 45, sales: 34, status: "pending" }
// //   ];

// //   const brandProducts = [
// //     { 
// //       id: 1, 
// //       name: "Premium Wireless Headphones", 
// //       brand: "TechBrand", 
// //       price: 199, 
// //       commission: 15,
// //       category: "Electronics"
// //     },
// //     { 
// //       id: 2, 
// //       name: "Organic Skincare Set", 
// //       brand: "BeautyBrand", 
// //       price: 129, 
// //       commission: 20,
// //       category: "Beauty"
// //     },
// //     { 
// //       id: 3, 
// //       name: "Fitness Tracker", 
// //       brand: "HealthTech", 
// //       price: 249, 
// //       commission: 12,
// //       category: "Fitness"
// //     },
// //     { 
// //       id: 4, 
// //       name: "Sustainable Water Bottle", 
// //       brand: "EcoBrand", 
// //       price: 39, 
// //       commission: 25,
// //       category: "Lifestyle"
// //     }
// //   ];

// //   const pendingRequests = [
// //     { id: 1, product: "Smart Watch", brand: "TechCorp", status: "pending", requestedAt: "2 days ago" },
// //     { id: 2, product: "Protein Powder", brand: "FitNutrition", status: "approved", requestedAt: "1 week ago" },
// //     { id: 3, product: "Camera Lens", brand: "PhotoGear", status: "rejected", requestedAt: "3 days ago" }
// //   ];

// //   const handleRequestProduct = (productId: number) => {
// //     // Mock request logic - in real app, this would send to admin
// //     alert("Product request sent to admin for approval!");
// //   };

// //   return (
// //     <div className="min-h-screen bg-background">
    
// //       <header className="border-b border-border bg-card/50 backdrop-blur-sm">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between items-center h-16">
// //             <div className="flex items-center space-x-4">
// //               <div className="flex items-center space-x-2">
// //                 <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[hsl(var(--brand-primary))] to-[hsl(var(--brand-secondary))]"></div>
// //                 <span className="text-xl font-bold text-[hsl(var(--brand-text))]">MINKO</span>
// //               </div>
// //               <Badge variant="secondary">Creator Dashboard</Badge>
// //             </div>
// //             <div className="flex items-center space-x-4">
// //               <Avatar>
// //                 <AvatarImage src="/placeholder.svg" />
// //                 <AvatarFallback>JD</AvatarFallback>
// //               </Avatar>
// //               <div>
// //                 <p className="font-medium">John Doe</p>
// //                 <p className="text-sm text-muted-foreground">@johndoe</p>
// //               </div>
// //               <Button variant="outline" onClick={() => navigate("/")}>Logout</Button>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         <div className="mb-8">
// //           <h1 className="text-3xl font-bold text-[hsl(var(--brand-text))]">Creator Dashboard</h1>
// //           <p className="text-[hsl(var(--brand-text-light))]">Manage your products and collaborate with brands</p>
// //         </div>

// //         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
// //           <TabsList className="grid grid-cols-4 w-full max-w-md">
// //             <TabsTrigger value="overview">Overview</TabsTrigger>
// //             <TabsTrigger value="products">My Products</TabsTrigger>
// //             <TabsTrigger value="brands">Brand Products</TabsTrigger>
// //             <TabsTrigger value="requests">Requests</TabsTrigger>
// //           </TabsList>

// //           <TabsContent value="overview" className="space-y-6">
// //             {/* Stats Cards */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //               <Card>
// //                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //                   <CardTitle className="text-sm font-medium">Total Products</CardTitle>
// //                   <Package className="h-4 w-4 text-muted-foreground" />
// //                 </CardHeader>
// //                 <CardContent>
// //                   <div className="text-2xl font-bold">{stats.totalProducts}</div>
// //                 </CardContent>
// //               </Card>
              
// //               <Card>
// //                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //                   <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
// //                   <DollarSign className="h-4 w-4 text-muted-foreground" />
// //                 </CardHeader>
// //                 <CardContent>
// //                   <div className="text-2xl font-bold">${stats.totalEarnings}</div>
// //                 </CardContent>
// //               </Card>
              
// //               <Card>
// //                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //                   <CardTitle className="text-sm font-medium">Total Views</CardTitle>
// //                   <Users className="h-4 w-4 text-muted-foreground" />
// //                 </CardHeader>
// //                 <CardContent>
// //                   <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
// //                 </CardContent>
// //               </Card>
              
// //               <Card>
// //                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //                   <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
// //                   <TrendingUp className="h-4 w-4 text-muted-foreground" />
// //                 </CardHeader>
// //                 <CardContent>
// //                   <div className="text-2xl font-bold">{stats.conversionRate}%</div>
// //                 </CardContent>
// //               </Card>
// //             </div>

// //             {/* Quick Actions */}
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle>Quick Actions</CardTitle>
// //               </CardHeader>
// //               <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                 <Button 
// //                   className="bg-[hsl(var(--brand-primary))] hover:bg-[hsl(var(--brand-primary))]/90"
// //                   onClick={() => setActiveTab("products")}
// //                 >
// //                   <Plus className="w-4 h-4 mr-2" />
// //                   Add New Product
// //                 </Button>
// //                 <Button 
// //                   variant="outline"
// //                   onClick={() => setActiveTab("brands")}
// //                 >
// //                   <ShoppingBag className="w-4 h-4 mr-2" />
// //                   Browse Brand Products
// //                 </Button>
// //                 <Button 
// //                   variant="outline"
// //                   onClick={() => navigate("/creator/storefront")}
// //                 >
// //                   <Star className="w-4 h-4 mr-2" />
// //                   View My Storefront
// //                 </Button>
// //               </CardContent>
// //             </Card>
// //           </TabsContent>

// //           <TabsContent value="products" className="space-y-6">
// //             <div className="flex justify-between items-center">
// //               <h2 className="text-2xl font-bold">My Products</h2>
// //               <Button className="bg-[hsl(var(--brand-primary))] hover:bg-[hsl(var(--brand-primary))]/90">
// //                 <Plus className="w-4 h-4 mr-2" />
// //                 Add Product
// //               </Button>
// //             </div>
            
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //               {myProducts.map((product) => (
// //                 <Card key={product.id}>
// //                   <CardHeader>
// //                     <div className="flex justify-between items-start">
// //                       <CardTitle className="text-lg">{product.name}</CardTitle>
// //                       <Badge variant={product.status === "active" ? "default" : "secondary"}>
// //                         {product.status}
// //                       </Badge>
// //                     </div>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <div className="space-y-2">
// //                       <p className="text-2xl font-bold">${product.price}</p>
// //                       <p className="text-sm text-muted-foreground">{product.sales} sales</p>
// //                       <Button variant="outline" className="w-full">Edit Product</Button>
// //                     </div>
// //                   </CardContent>
// //                 </Card>
// //               ))}
// //             </div>
// //           </TabsContent>

// //           <TabsContent value="brands" className="space-y-6">
// //             <div className="flex justify-between items-center">
// //               <h2 className="text-2xl font-bold">Brand Products</h2>
// //               <p className="text-[hsl(var(--brand-text-light))]">Request products to promote and earn commission</p>
// //             </div>
            
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //               {brandProducts.map((product) => (
// //                 <Card key={product.id}>
// //                   <CardHeader>
// //                     <CardTitle className="text-lg">{product.name}</CardTitle>
// //                     <p className="text-sm text-muted-foreground">by {product.brand}</p>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <div className="space-y-4">
// //                       <div className="flex justify-between">
// //                         <span>Price:</span>
// //                         <span className="font-bold">${product.price}</span>
// //                       </div>
// //                       <div className="flex justify-between">
// //                         <span>Commission:</span>
// //                         <span className="font-bold text-green-600">{product.commission}%</span>
// //                       </div>
// //                       <Badge variant="secondary">{product.category}</Badge>
// //                       <Button 
// //                         className="w-full bg-[hsl(var(--brand-primary))] hover:bg-[hsl(var(--brand-primary))]/90"
// //                         onClick={() => handleRequestProduct(product.id)}
// //                       >
// //                         Request to Promote
// //                       </Button>
// //                     </div>
// //                   </CardContent>
// //                 </Card>
// //               ))}
// //             </div>
// //           </TabsContent>

// //           <TabsContent value="requests" className="space-y-6">
// //             <h2 className="text-2xl font-bold">Product Requests</h2>
            
// //             <div className="space-y-4">
// //               {pendingRequests.map((request) => (
// //                 <Card key={request.id}>
// //                   <CardContent className="p-6">
// //                     <div className="flex justify-between items-center">
// //                       <div className="space-y-1">
// //                         <h3 className="font-semibold">{request.product}</h3>
// //                         <p className="text-sm text-muted-foreground">by {request.brand}</p>
// //                         <p className="text-xs text-muted-foreground flex items-center">
// //                           <Clock className="w-3 h-3 mr-1" />
// //                           Requested {request.requestedAt}
// //                         </p>
// //                       </div>
// //                       <div className="flex items-center space-x-2">
// //                         {request.status === "pending" && (
// //                           <Badge variant="secondary" className="flex items-center">
// //                             <Clock className="w-3 h-3 mr-1" />
// //                             Pending
// //                           </Badge>
// //                         )}
// //                         {request.status === "approved" && (
// //                           <Badge variant="default" className="flex items-center bg-green-600">
// //                             <CheckCircle className="w-3 h-3 mr-1" />
// //                             Approved
// //                           </Badge>
// //                         )}
// //                         {request.status === "rejected" && (
// //                           <Badge variant="destructive" className="flex items-center">
// //                             <XCircle className="w-3 h-3 mr-1" />
// //                             Rejected
// //                           </Badge>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </CardContent>
// //                 </Card>
// //               ))}
// //             </div>
// //           </TabsContent>
// //         </Tabs>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CreatorDashboard;








// // CreatorDashboard.jsx
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// import { Button } from "../../components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
// import { Badge } from "../../components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
// import {
//   Package, TrendingUp, DollarSign, Users, Plus,
//   ShoppingBag, Star, Clock, CheckCircle, XCircle, Settings,
//   CloudCog
// } from "lucide-react";
// import Navbar from "../Navbar";

// const CreatorDashboard = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("home");
//   const [user, setUser] = useState(null);
//   const [myProducts, setMyProducts] = useState<any[]>([]); // ✅ start as empty array


//   // Fetch user and products on mount
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     axios.get("/api/creator", { headers: { Authorization: `Bearer ${token}` } })
//       .then(res => {
//         setUser(res.data);
//         console.log("user", res.data);
//       })
//       .catch(() => navigate("/login"));

//     fetchMyProducts();
//   }, []);

//   const fetchMyProducts = () => {
//     const token = localStorage.getItem("token");
//     axios.get("/api/creator/products", { headers: { Authorization: `Bearer ${token}` } })
//       .then(res => {
//         setMyProducts(res.data);
//         console.log(res);
//       })
//       .catch(err => console.error("Error fetching products", err));
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const stats = {
//     totalProducts: myProducts.length,
//     totalEarnings: 2450,
//     totalViews: 15600,
//     conversionRate: 3.2
//   };

//   const brandProducts = [
//     { id: 1, name: "Premium Wireless Headphones", brand: "TechBrand", price: 199, commission: 15, category: "Electronics" },
//     { id: 2, name: "Organic Skincare Set", brand: "BeautyBrand", price: 129, commission: 20, category: "Beauty" }
//   ];

//   const pendingRequests = [
//     { id: 1, product: "Smart Watch", brand: "TechCorp", status: "pending", requestedAt: "2 days ago" },
//     { id: 2, product: "Protein Powder", brand: "FitNutrition", status: "approved", requestedAt: "1 week ago" }
//   ];

//   const handleRequestProduct = (productId) => {
//     alert("Product request sent to admin for approval!");
//   };

//   if (!user) return <div className="text-center mt-10">Loading dashboard...</div>;
  
//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-8 flex justify-between">
//           <div>
//             <h1 className="text-3xl font-bold">Creator Dashboard</h1>
//             <p className="text-muted-foreground">Manage your products and collaborate with brands</p>
//           </div>
//           {/* <Button variant="outline" onClick={() => navigate("/creator/settings")}>Settings</Button> */}
//         </div>

//         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
//           <TabsList className="grid grid-cols-5 w-full max-w-md">
//             <TabsTrigger value="home">Home</TabsTrigger>
//             <TabsTrigger value="store">My Store</TabsTrigger>
//             <TabsTrigger value="products">My Products</TabsTrigger>
//             {/* <TabsTrigger value="brands">Brand Products</TabsTrigger> */}
//             <TabsTrigger value="settings">Settings</TabsTrigger>
//             <TabsTrigger value="requests">Requests</TabsTrigger>
//           </TabsList>

//           {/* Overview */}
//           <TabsContent value="home" className="space-y-6">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl font-bold">Welcome, {user.name}</h2>
//               </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {[
//                 { title: "Total Products", value: stats.totalProducts, icon: <Package className="h-4 w-4" /> },
//                 { title: "Total Earnings", value: `$${stats.totalEarnings}`, icon: <DollarSign className="h-4 w-4" /> },
//                 { title: "Total Views", value: stats.totalViews.toLocaleString(), icon: <Users className="h-4 w-4" /> },
//                 { title: "Conversion Rate", value: `${stats.conversionRate}%`, icon: <TrendingUp className="h-4 w-4" /> }
//               ].map((item, i) => (
//                 <Card key={i}>
//                   <CardHeader className="flex justify-between items-center pb-2">
//                     <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
//                     <div className="text-muted-foreground">{item.icon}</div>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-2xl font-bold">{item.value}</div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//             <h2 className="text-2xl font-bold">Brand Products</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {brandProducts.map((product) => (
//                 <Card key={product.id}>
//                   <CardHeader>
//                     <CardTitle>{product.name}</CardTitle>
//                     <p className="text-sm text-muted-foreground">by {product.brand}</p>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-2">
//                       <div className="flex justify-between">
//                         <span>Price:</span>
//                         <span className="font-bold">${product.price}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>Commission:</span>
//                         <span className="font-bold text-green-600">{product.commission}%</span>
//                       </div>
//                       <Badge variant="secondary">{product.category}</Badge>
//                       <Button className="w-full mt-2" onClick={() => handleRequestProduct(product.id)}>
//                         Request to Promote
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>

// <TabsContent value="store" className="space-y-6">
//   <div className="flex justify-between items-center">
// <h2>Store</h2>
//     </div>
//   </TabsContent>
//           {/* My Products */}
//           <TabsContent value="products" className="space-y-6">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl font-bold">My Products</h2>
//               <Button onClick={() => navigate("/creator/add-product")}>
//                 <Plus className="w-4 h-4 mr-2" /> Add Product
//               </Button>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//              {Array.isArray(myProducts) && myProducts.map(product => (
//                 <Card key={product._id}>
//                   <CardHeader className="flex justify-between items-start">
//                     <CardTitle>{product.name}</CardTitle>
//                     <Badge variant={product.status === "active" ? "default" : "secondary"}>
//                       {product.status}
//                     </Badge>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-2xl font-bold">${product.price}</p>
//                     <p className="text-sm text-muted-foreground">{product.sales || 0} sales</p>
//                     <Button variant="outline" className="w-full mt-2">Edit Product</Button>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>

//           {/* Brand Products */}
//           <TabsContent value="brands" className="space-y-6">
//             <div className="flex justify-between items-center">
// {/* <Settings /> */}
// <Button variant="outline" onClick={() => navigate("/creator/settings")}>Settings</Button>
//               </div>
//           </TabsContent>

//           {/* Requests */}
//           <TabsContent value="requests" className="space-y-6">
//             <h2 className="text-2xl font-bold">Product Requests</h2>
//             {pendingRequests.map((req) => (
//               <Card key={req.id}>
//                 <CardContent className="p-6 flex justify-between items-center">
//                   <div>
//                     <h3 className="font-semibold">{req.product}</h3>
//                     <p className="text-sm text-muted-foreground">by {req.brand}</p>
//                     <p className="text-xs text-muted-foreground flex items-center">
//                       <Clock className="w-3 h-3 mr-1" /> Requested {req.requestedAt}
//                     </p>
//                   </div>
//                   <Badge variant={
//                     req.status === "approved" ? "default" :
//                     req.status === "rejected" ? "destructive" : "secondary"
//                   }>
//                     {req.status}
//                   </Badge>
//                 </CardContent>
//               </Card>
//             ))}
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchUserData();
    fetchMyProducts();
    fetchBrandProducts();
    fetchStats();
  }, []);

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
    // Mock brand products for now
    setBrandProducts([
      { 
        id: 1, 
        name: "Premium Wireless Headphones", 
        brand: "TechBrand", 
        price: 199, 
        commission: 15, 
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300"
      },
      { 
        id: 2, 
        name: "Organic Skincare Set", 
        brand: "BeautyBrand", 
        price: 129, 
        commission: 20, 
        category: "Beauty",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300"
      },
      { 
        id: 3, 
        name: "Fitness Tracker Pro", 
        brand: "FitnessCorp", 
        price: 299, 
        commission: 18, 
        category: "Fitness",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300"
      }
    ]);
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

  const handleRequestProduct = (productId: number) => {
    // Add to pending requests
    const product = brandProducts.find(p => p.id === productId);
    if (product) {
      setPendingRequests(prev => [...prev, {
        id: Date.now(),
        product: product.name,
        brand: product.brand,
        status: "pending",
        requestedAt: "Just now"
      }]);
      alert("Product request sent for approval!");
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/api/creator/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchMyProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  const shareStore = () => {
    const storeUrl = `${window.location.origin}/store/${user._id}`;
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
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="home">Overview</TabsTrigger>
            <TabsTrigger value="products">My Products</TabsTrigger>
            <TabsTrigger value="brands">Brand Products</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

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
                    {myProducts.slice(0, 3).map((product) => (
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
                    ))}
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
            )}
          </TabsContent>

          {/* Brand Products */}
          <TabsContent value="brands" className="space-y-6">
            <h2 className="text-2xl font-bold">Brand Collaboration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brandProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
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
                      onClick={() => handleRequestProduct(product.id)}
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
              <div className="space-y-4">
                {pendingRequests.map((req) => (
                  <Card key={req.id}>
                    <CardContent className="p-6 flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{req.product}</h3>
                        <p className="text-sm text-muted-foreground">by {req.brand}</p>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                          <Clock className="w-3 h-3 mr-1" /> Requested {req.requestedAt}
                        </p>
                      </div>
                      <Badge variant={
                        req.status === "approved" ? "default" :
                        req.status === "rejected" ? "destructive" : "secondary"
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