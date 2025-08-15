import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { 
  Package, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Plus, 
  BarChart3,
  Eye,
  ShoppingCart,
  Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const BrandDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const stats = {
    totalProducts: 25,
    totalRevenue: 45600,
    totalCreators: 89,
    conversionRate: 4.8
  };

  const products = [
    { 
      id: 1, 
      name: "Premium Wireless Headphones", 
      price: 199, 
      stock: 150, 
      creatorsPromoting: 12,
      totalSales: 89
    },
    { 
      id: 2, 
      name: "Smart Fitness Tracker", 
      price: 249, 
      stock: 75, 
      creatorsPromoting: 8,
      totalSales: 156
    },
    { 
      id: 3, 
      name: "Sustainable Water Bottle", 
      price: 39, 
      stock: 200, 
      creatorsPromoting: 23,
      totalSales: 234
    }
  ];

  const creatorRequests = [
    {
      id: 1,
      creator: "Jane Smith",
      handle: "@janesmith",
      followers: "125K",
      product: "Premium Wireless Headphones",
      requestedAt: "2 hours ago",
      status: "pending"
    },
    {
      id: 2,
      creator: "Mike Johnson",
      handle: "@mikej",
      followers: "89K",
      product: "Smart Fitness Tracker",
      requestedAt: "1 day ago",
      status: "pending"
    },
    {
      id: 3,
      creator: "Sarah Wilson",
      handle: "@sarahw",
      followers: "67K",
      product: "Sustainable Water Bottle",
      requestedAt: "3 days ago",
      status: "approved"
    }
  ];

  const topCreators = [
    { id: 1, name: "Alex Chen", handle: "@alexchen", sales: 45, revenue: 8950 },
    { id: 2, name: "Emma Davis", handle: "@emmad", sales: 38, revenue: 7220 },
    { id: 3, name: "Ryan Martinez", handle: "@ryanm", sales: 32, revenue: 6140 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[hsl(var(--brand-primary))] to-[hsl(var(--brand-secondary))]"></div>
                <span className="text-xl font-bold text-[hsl(var(--brand-text))]">MINKO</span>
              </div>
              <Badge variant="secondary">Brand Dashboard</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>TB</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">TechBrand Inc.</p>
                <p className="text-sm text-muted-foreground">@techbrand</p>
              </div>
              <Button variant="outline" onClick={() => navigate("/")}>Logout</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[hsl(var(--brand-text))]">Brand Dashboard</h1>
          <p className="text-[hsl(var(--brand-text-light))]">Manage your products and collaborate with creators</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="creators">Creators</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalProducts}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Creators</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalCreators}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.conversionRate}%</div>
                </CardContent>
              </Card>
            </div>

            {/* Creator Requests */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Creator Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {creatorRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{request.creator.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{request.creator}</p>
                          <p className="text-sm text-muted-foreground">{request.handle} • {request.followers} followers</p>
                          <p className="text-xs text-muted-foreground">Wants to promote: {request.product}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-[hsl(var(--brand-primary))] hover:bg-[hsl(var(--brand-primary))]/90">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline">
                          Decline
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Creators */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Creators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCreators.map((creator, index) => (
                    <div key={creator.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-full bg-[hsl(var(--brand-primary))]/10 flex items-center justify-center">
                          <span className="font-bold text-[hsl(var(--brand-primary))]">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{creator.name}</p>
                          <p className="text-sm text-muted-foreground">{creator.handle}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${creator.revenue.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">{creator.sales} sales</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Product Management</h2>
              <Button className="bg-[hsl(var(--brand-primary))] hover:bg-[hsl(var(--brand-primary))]/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Price:</span>
                        <span className="font-bold">${product.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Stock:</span>
                        <span className="font-bold">{product.stock}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Creators:</span>
                        <span className="font-bold">{product.creatorsPromoting}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Sales:</span>
                        <span className="font-bold text-green-600">{product.totalSales}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="creators" className="space-y-6">
            <h2 className="text-2xl font-bold">Creator Collaboration</h2>
            
            <div className="space-y-4">
              {creatorRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{request.creator.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{request.creator}</h3>
                          <p className="text-sm text-muted-foreground">{request.handle} • {request.followers} followers</p>
                          <p className="text-sm">Wants to promote: <span className="font-medium">{request.product}</span></p>
                          <p className="text-xs text-muted-foreground">Requested {request.requestedAt}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {request.status === "pending" ? (
                          <>
                            <Button size="sm" className="bg-[hsl(var(--brand-primary))] hover:bg-[hsl(var(--brand-primary))]/90">
                              Approve
                            </Button>
                            <Button size="sm" variant="outline">
                              Decline
                            </Button>
                          </>
                        ) : (
                          <Badge variant="default" className="bg-green-600">
                            Approved
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics & Insights</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Revenue</span>
                      <span className="font-bold">${stats.totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Order Value</span>
                      <span className="font-bold">$156</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Creator Conversion Rate</span>
                      <span className="font-bold">4.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Return on Ad Spend</span>
                      <span className="font-bold">3.2x</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Growth Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Revenue Growth</span>
                      <span className="font-bold text-green-600">+23%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>New Creators</span>
                      <span className="font-bold text-green-600">+15</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Product Views</span>
                      <span className="font-bold text-green-600">+45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conversion Rate</span>
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