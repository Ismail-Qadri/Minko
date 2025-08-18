// import { useState } from "react";
// import { Button } from "../../components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
// import { Badge } from "../../components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
// import { 
//   Package, 
//   TrendingUp, 
//   DollarSign, 
//   Users, 
//   Plus, 
//   BarChart3,
//   Eye,
//   ShoppingCart,
//   Star
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const BrandDashboard = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("overview");

//   // Mock data
//   const stats = {
//     totalProducts: 25,
//     totalRevenue: 45600,
//     totalCreators: 89,
//     conversionRate: 4.8
//   };

//   const products = [
//     { 
//       id: 1, 
//       name: "Premium Wireless Headphones", 
//       price: 199, 
//       stock: 150, 
//       creatorsPromoting: 12,
//       totalSales: 89
//     },
//     { 
//       id: 2, 
//       name: "Smart Fitness Tracker", 
//       price: 249, 
//       stock: 75, 
//       creatorsPromoting: 8,
//       totalSales: 156
//     },
//     { 
//       id: 3, 
//       name: "Sustainable Water Bottle", 
//       price: 39, 
//       stock: 200, 
//       creatorsPromoting: 23,
//       totalSales: 234
//     }
//   ];

//   const creatorRequests = [
//     {
//       id: 1,
//       creator: "Jane Smith",
//       handle: "@janesmith",
//       followers: "125K",
//       product: "Premium Wireless Headphones",
//       requestedAt: "2 hours ago",
//       status: "pending"
//     },
//     {
//       id: 2,
//       creator: "Mike Johnson",
//       handle: "@mikej",
//       followers: "89K",
//       product: "Smart Fitness Tracker",
//       requestedAt: "1 day ago",
//       status: "pending"
//     },
//     {
//       id: 3,
//       creator: "Sarah Wilson",
//       handle: "@sarahw",
//       followers: "67K",
//       product: "Sustainable Water Bottle",
//       requestedAt: "3 days ago",
//       status: "approved"
//     }
//   ];

//   const topCreators = [
//     { id: 1, name: "Alex Chen", handle: "@alexchen", sales: 45, revenue: 8950 },
//     { id: 2, name: "Emma Davis", handle: "@emmad", sales: 38, revenue: 7220 },
//     { id: 3, name: "Ryan Martinez", handle: "@ryanm", sales: 32, revenue: 6140 }
//   ];

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="border-b border-border bg-card/50 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2">
//                 <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[hsl(var(--brand-primary))] to-[hsl(var(--brand-secondary))]"></div>
//                 <span className="text-xl font-bold text-[hsl(var(--brand-text))]">MINKO</span>
//               </div>
//               <Badge variant="secondary">Brand Dashboard</Badge>
//             </div>
//             <div className="flex items-center space-x-4">
//               <Avatar>
//                 <AvatarImage src="/placeholder.svg" />
//                 <AvatarFallback>TB</AvatarFallback>
//               </Avatar>
//               <div>
//                 <p className="font-medium">TechBrand Inc.</p>
//                 <p className="text-sm text-muted-foreground">@techbrand</p>
//               </div>
//               <Button variant="outline" onClick={() => navigate("/")}>Logout</Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-[hsl(var(--brand-text))]">Brand Dashboard</h1>
//           <p className="text-[hsl(var(--brand-text-light))]">Manage your products and collaborate with creators</p>
//         </div>

//         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
//           <TabsList className="grid grid-cols-4 w-full max-w-md">
//             <TabsTrigger value="overview">Overview</TabsTrigger>
//             <TabsTrigger value="products">Products</TabsTrigger>
//             <TabsTrigger value="creators">Creators</TabsTrigger>
//             <TabsTrigger value="analytics">Analytics</TabsTrigger>
//           </TabsList>

//           <TabsContent value="overview" className="space-y-6">
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Total Products</CardTitle>
//                   <Package className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{stats.totalProducts}</div>
//                 </CardContent>
//               </Card>
              
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//                   <DollarSign className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
//                 </CardContent>
//               </Card>
              
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Active Creators</CardTitle>
//                   <Users className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{stats.totalCreators}</div>
//                 </CardContent>
//               </Card>
              
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
//                   <TrendingUp className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{stats.conversionRate}%</div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Creator Requests */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Recent Creator Requests</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {creatorRequests.slice(0, 3).map((request) => (
//                     <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
//                       <div className="flex items-center space-x-4">
//                         <Avatar>
//                           <AvatarFallback>{request.creator.split(' ').map(n => n[0]).join('')}</AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <p className="font-medium">{request.creator}</p>
//                           <p className="text-sm text-muted-foreground">{request.handle} • {request.followers} followers</p>
//                           <p className="text-xs text-muted-foreground">Wants to promote: {request.product}</p>
//                         </div>
//                       </div>
//                       <div className="flex space-x-2">
//                         <Button size="sm" className="bg-[hsl(var(--brand-primary))] hover:bg-[hsl(var(--brand-primary))]/90">
//                           Approve
//                         </Button>
//                         <Button size="sm" variant="outline">
//                           Decline
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Top Performing Creators */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Top Performing Creators</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {topCreators.map((creator, index) => (
//                     <div key={creator.id} className="flex items-center justify-between">
//                       <div className="flex items-center space-x-4">
//                         <div className="w-8 h-8 rounded-full bg-[hsl(var(--brand-primary))]/10 flex items-center justify-center">
//                           <span className="font-bold text-[hsl(var(--brand-primary))]">#{index + 1}</span>
//                         </div>
//                         <div>
//                           <p className="font-medium">{creator.name}</p>
//                           <p className="text-sm text-muted-foreground">{creator.handle}</p>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <p className="font-bold">${creator.revenue.toLocaleString()}</p>
//                         <p className="text-sm text-muted-foreground">{creator.sales} sales</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="products" className="space-y-6">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl font-bold">Product Management</h2>
//               <Button className="bg-[hsl(var(--brand-primary))] hover:bg-[hsl(var(--brand-primary))]/90">
//                 <Plus className="w-4 h-4 mr-2" />
//                 Add Product
//               </Button>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {products.map((product) => (
//                 <Card key={product.id}>
//                   <CardHeader>
//                     <CardTitle className="text-lg">{product.name}</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <div className="flex justify-between">
//                         <span>Price:</span>
//                         <span className="font-bold">${product.price}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>Stock:</span>
//                         <span className="font-bold">{product.stock}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>Creators:</span>
//                         <span className="font-bold">{product.creatorsPromoting}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>Total Sales:</span>
//                         <span className="font-bold text-green-600">{product.totalSales}</span>
//                       </div>
//                       <div className="flex space-x-2">
//                         <Button variant="outline" size="sm" className="flex-1">
//                           <Eye className="w-4 h-4 mr-1" />
//                           View
//                         </Button>
//                         <Button variant="outline" size="sm" className="flex-1">
//                           Edit
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>

//           <TabsContent value="creators" className="space-y-6">
//             <h2 className="text-2xl font-bold">Creator Collaboration</h2>
            
//             <div className="space-y-4">
//               {creatorRequests.map((request) => (
//                 <Card key={request.id}>
//                   <CardContent className="p-6">
//                     <div className="flex justify-between items-center">
//                       <div className="flex items-center space-x-4">
//                         <Avatar>
//                           <AvatarFallback>{request.creator.split(' ').map(n => n[0]).join('')}</AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <h3 className="font-semibold">{request.creator}</h3>
//                           <p className="text-sm text-muted-foreground">{request.handle} • {request.followers} followers</p>
//                           <p className="text-sm">Wants to promote: <span className="font-medium">{request.product}</span></p>
//                           <p className="text-xs text-muted-foreground">Requested {request.requestedAt}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         {request.status === "pending" ? (
//                           <>
//                             <Button size="sm" className="bg-[hsl(var(--brand-primary))] hover:bg-[hsl(var(--brand-primary))]/90">
//                               Approve
//                             </Button>
//                             <Button size="sm" variant="outline">
//                               Decline
//                             </Button>
//                           </>
//                         ) : (
//                           <Badge variant="default" className="bg-green-600">
//                             Approved
//                           </Badge>
//                         )}
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>

//           <TabsContent value="analytics" className="space-y-6">
//             <h2 className="text-2xl font-bold">Analytics & Insights</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <BarChart3 className="w-5 h-5 mr-2" />
//                     Performance Metrics
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <div className="flex justify-between">
//                       <span>Total Revenue</span>
//                       <span className="font-bold">${stats.totalRevenue.toLocaleString()}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Average Order Value</span>
//                       <span className="font-bold">$156</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Creator Conversion Rate</span>
//                       <span className="font-bold">4.8%</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Return on Ad Spend</span>
//                       <span className="font-bold">3.2x</span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <TrendingUp className="w-5 h-5 mr-2" />
//                     Growth Trends
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <div className="flex justify-between">
//                       <span>Revenue Growth</span>
//                       <span className="font-bold text-green-600">+23%</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>New Creators</span>
//                       <span className="font-bold text-green-600">+15</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Product Views</span>
//                       <span className="font-bold text-green-600">+45%</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Conversion Rate</span>
//                       <span className="font-bold text-green-600">+12%</span>
//                     </div>
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

// export default BrandDashboard;









import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  Package, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Plus, 
  BarChart3,
  Eye,
  Edit,
  Trash2,
  Check,
  X
} from "lucide-react";

// Set axios base URL
axios.defaults.baseURL = "http://localhost:5000";

const BrandDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  
  // State management
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalRevenue: 0,
    totalCreators: 0,
    conversionRate: 0
  });

  const [products, setProducts] = useState([]);
  const [creatorRequests, setCreatorRequests] = useState([]);
  const [collaboratingCreators, setCollaboratingCreators] = useState([]);
  const [topCreators, setTopCreators] = useState([]);

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
        fetchStats(),
        fetchProducts(),
        fetchCreatorRequests(),
        fetchCollaboratingCreators(),
        fetchTopCreators()
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/brand/stats", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/brand/products", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCreatorRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/brand/creator-requests", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCreatorRequests(response.data);
    } catch (error) {
      console.error("Error fetching creator requests:", error);
    }
  };

  const fetchCollaboratingCreators = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/brand/collaborating-creators", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCollaboratingCreators(response.data);
    } catch (error) {
      console.error("Error fetching collaborating creators:", error);
    }
  };

  const fetchTopCreators = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/brand/top-creators", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTopCreators(response.data);
    } catch (error) {
      console.error("Error fetching top creators:", error);
    }
  };

  const handleApproveRequest = async (requestId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/brand/creator-requests/${requestId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast({
        title: "Success",
        description: "Creator request approved successfully"
      });
      
      fetchCreatorRequests();
      fetchCollaboratingCreators();
    } catch (error) {
      console.error("Error approving request:", error);
      toast({
        title: "Error",
        description: "Failed to approve request",
        variant: "destructive"
      });
    }
  };

  const handleDeclineRequest = async (requestId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/brand/creator-requests/${requestId}/decline`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast({
        title: "Success",
        description: "Creator request declined"
      });
      
      fetchCreatorRequests();
    } catch (error) {
      console.error("Error declining request:", error);
      toast({
        title: "Error",
        description: "Failed to decline request",
        variant: "destructive"
      });
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/brand/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast({
        title: "Success",
        description: "Product deleted successfully"
      });
      
      fetchProducts();
      fetchStats();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive"
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
              <Badge variant="secondary" className="bg-brand-primary/10 text-brand-primary border-brand-primary/20">
                Brand Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-brand-primary text-white">TB</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-brand-text">TechBrand Inc.</p>
                <p className="text-sm text-brand-text-light">@techbrand</p>
              </div>
              <Button variant="outline" onClick={() => navigate("/")}>Logout</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-text">Brand Dashboard</h1>
          <p className="text-brand-text-light">Manage your products and collaborate with creators</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md bg-muted/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">Products</TabsTrigger>
            <TabsTrigger value="creators" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">Creators</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-card to-muted/50 border-brand-primary/20 hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-brand-text">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-brand-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-brand-text">{stats.totalProducts}</div>
                  <p className="text-xs text-brand-text-light">Active products</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-card to-muted/50 border-brand-primary/20 hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-brand-text">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-brand-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-brand-text">${stats.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-green-600">+12% from last month</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-card to-muted/50 border-brand-primary/20 hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-brand-text">Active Creators</CardTitle>
                  <Users className="h-4 w-4 text-brand-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-brand-text">{stats.totalCreators}</div>
                  <p className="text-xs text-brand-text-light">Collaborating creators</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-card to-muted/50 border-brand-primary/20 hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-brand-text">Conversion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-brand-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-brand-text">{stats.conversionRate}%</div>
                  <p className="text-xs text-green-600">+0.5% improvement</p>
                </CardContent>
              </Card>
            </div>

            {/* Creator Requests */}
            <Card className="border-brand-primary/20">
              <CardHeader>
                <CardTitle className="text-brand-text">Recent Creator Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {creatorRequests.slice(0, 3).map((request: any) => (
                    <div key={request._id} className="flex items-center justify-between p-4 border border-brand-primary/10 rounded-lg bg-gradient-to-r from-card to-muted/30">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback className="bg-brand-primary/10 text-brand-primary">
                            {request.creator?.name?.split(' ').map((n: string) => n[0]).join('') || 'CR'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-brand-text">{request.creator?.name}</p>
                          <p className="text-sm text-brand-text-light">@{request.creator?.username} • {request.creator?.followers || 0} followers</p>
                          <p className="text-xs text-brand-text-light">Wants to promote: {request.product?.name}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="bg-brand-primary hover:bg-brand-primary/90 text-white"
                          onClick={() => handleApproveRequest(request._id)}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => handleDeclineRequest(request._id)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  ))}
                  {creatorRequests.length === 0 && (
                    <div className="text-center py-8 text-brand-text-light">
                      No pending creator requests
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Creators */}
            <Card className="border-brand-primary/20">
              <CardHeader>
                <CardTitle className="text-brand-text">Top Performing Creators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCreators.map((creator: any, index: number) => (
                    <div key={creator._id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                          <span className="font-bold text-brand-primary">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-brand-text">{creator.name}</p>
                          <p className="text-sm text-brand-text-light">@{creator.username}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-brand-text">${creator.revenue.toLocaleString()}</p>
                        <p className="text-sm text-brand-text-light">{creator.sales} sales</p>
                      </div>
                    </div>
                  ))}
                  {topCreators.length === 0 && (
                    <div className="text-center py-8 text-brand-text-light">
                      No sales data available yet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-brand-text">Product Management</h2>
              <Button 
                className="bg-brand-primary hover:bg-brand-primary/90 text-white"
                onClick={() => navigate("/brand/brand-add-product")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
            
            {products.length === 0 ? (
              <Card className="text-center py-12 border-brand-primary/20">
                <CardContent>
                  <Package className="w-12 h-12 mx-auto mb-4 text-brand-primary" />
                  <h3 className="text-lg font-semibold mb-2 text-brand-text">No products yet</h3>
                  <p className="text-brand-text-light mb-4">Start by adding your first product for creators to promote.</p>
                  <Button 
                    className="bg-brand-primary hover:bg-brand-primary/90 text-white"
                    onClick={() => navigate("/brand/brand-add-product")}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Product
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product: any) => (
                  <Card key={product._id} className="border-brand-primary/20 hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="aspect-square relative">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 flex items-center justify-center">
                          <Package className="w-12 h-12 text-brand-primary" />
                        </div>
                      )}
                      <Badge className="absolute top-2 right-2 bg-brand-primary text-white">
                        {product.commission}% Commission
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg text-brand-text line-clamp-1">{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-brand-text-light">Price:</span>
                          <span className="font-bold text-brand-text">${product.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-text-light">Stock:</span>
                          <span className="font-bold text-brand-text">{product.stock}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-text-light">Creators:</span>
                          <span className="font-bold text-brand-text">{product.creatorsPromoting || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-text-light">Total Sales:</span>
                          <span className="font-bold text-green-600">{product.totalSales || 0}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => navigate(`/brand/brand-edit-product/${product._id}`)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteProduct(product._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="creators" className="space-y-6">
            <h2 className="text-2xl font-bold text-brand-text">Creator Collaboration</h2>
            
            <Tabs defaultValue="requests" className="space-y-4">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="requests" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">
                  Pending Requests ({creatorRequests.length})
                </TabsTrigger>
                <TabsTrigger value="collaborating" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">
                  Collaborating Creators ({collaboratingCreators.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="requests" className="space-y-4">
                {creatorRequests.length === 0 ? (
                  <Card className="text-center py-12 border-brand-primary/20">
                    <CardContent>
                      <Users className="w-12 h-12 mx-auto mb-4 text-brand-primary" />
                      <h3 className="text-lg font-semibold mb-2 text-brand-text">No pending requests</h3>
                      <p className="text-brand-text-light">Creators will see your products and can request to promote them.</p>
                    </CardContent>
                  </Card>
                ) : (
                  creatorRequests.map((request: any) => (
                    <Card key={request._id} className="border-brand-primary/20">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarFallback className="bg-brand-primary/10 text-brand-primary">
                                {request.creator?.name?.split(' ').map((n: string) => n[0]).join('') || 'CR'}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-brand-text">{request.creator?.name}</h3>
                              <p className="text-sm text-brand-text-light">@{request.creator?.username} • {request.creator?.followers || 0} followers</p>
                              <p className="text-sm text-brand-text">Wants to promote: <span className="font-medium">{request.product?.name}</span></p>
                              <p className="text-xs text-brand-text-light">Requested {new Date(request.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              className="bg-brand-primary hover:bg-brand-primary/90 text-white"
                              onClick={() => handleApproveRequest(request._id)}
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-red-200 text-red-600 hover:bg-red-50"
                              onClick={() => handleDeclineRequest(request._id)}
                            >
                              <X className="w-4 h-4 mr-1" />
                              Decline
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="collaborating" className="space-y-4">
                {collaboratingCreators.length === 0 ? (
                  <Card className="text-center py-12 border-brand-primary/20">
                    <CardContent>
                      <Users className="w-12 h-12 mx-auto mb-4 text-brand-primary" />
                      <h3 className="text-lg font-semibold mb-2 text-brand-text">No active collaborations</h3>
                      <p className="text-brand-text-light">Approve creator requests to start collaborations.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {collaboratingCreators.map((creator: any) => (
                      <Card key={creator._id} className="border-brand-primary/20">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4 mb-4">
                            <Avatar>
                              <AvatarFallback className="bg-brand-primary/10 text-brand-primary">
                                {creator.name?.split(' ').map((n: string) => n[0]).join('') || 'CR'}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-brand-text">{creator.name}</h3>
                              <p className="text-sm text-brand-text-light">@{creator.username}</p>
                              <p className="text-xs text-brand-text-light">{creator.followers || 0} followers</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-brand-text-light">Products:</span>
                              <span className="text-sm font-medium text-brand-text">{creator.productsPromoting || 0}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-brand-text-light">Sales:</span>
                              <span className="text-sm font-medium text-brand-text">{creator.totalSales || 0}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-brand-text-light">Revenue:</span>
                              <span className="text-sm font-medium text-green-600">${creator.totalRevenue || 0}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-brand-text">Analytics & Insights</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-brand-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-brand-text">
                    <BarChart3 className="w-5 h-5 mr-2 text-brand-primary" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-brand-text-light">Total Revenue</span>
                      <span className="font-bold text-brand-text">${stats.totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-text-light">Average Order Value</span>
                      <span className="font-bold text-brand-text">$156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-text-light">Creator Conversion Rate</span>
                      <span className="font-bold text-brand-text">{stats.conversionRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-text-light">Return on Ad Spend</span>
                      <span className="font-bold text-brand-text">3.2x</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-brand-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-brand-text">
                    <TrendingUp className="w-5 h-5 mr-2 text-brand-primary" />
                    Growth Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-brand-text-light">Revenue Growth</span>
                      <span className="font-bold text-green-600">+23%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-text-light">New Creators</span>
                      <span className="font-bold text-green-600">+{stats.totalCreators}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-text-light">Product Views</span>
                      <span className="font-bold text-green-600">+45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-text-light">Conversion Rate</span>
                      <span className="font-bold text-green-600">+12%</span>
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