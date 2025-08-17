import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Search, Users, Star, ExternalLink, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom/dist";
import Navbar from "./Navbar";
import { Skeleton } from "../components/ui/skeleton";


const Browse = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const [isLoading, setIsLoading] = useState(true); // Add this line
   const [creators, setCreators] = useState<any[]>([]);


    useEffect(() => {
    const fetchCreators = async () => {
      try {
         const res = await axios.get("http://localhost:5000/api/users?type=creator");
        // Adjust API URL based on your backend route
        setCreators(res.data);
        console.log("res.data", res.data);
      } catch (error) {
        console.error("Error fetching creators:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCreators();
  }, []);


  // Mock data for creators
  // const creators = [
  //   {
  //     id: 1,
  //     name: "Jane Smith",
  //     handle: "@janesmith",
  //     followers: "125K",
  //     category: "Beauty & Lifestyle",
  //     rating: 4.8,
  //     totalSales: 1250,
  //     avatar: "/placeholder.svg",
  //     description: "Beauty enthusiast sharing skincare tips and lifestyle content",
  //     products: 15,
  //     verified: true
  //   },
  //   {
  //     id: 2,
  //     name: "Mike Johnson",
  //     handle: "@mikej",
  //     followers: "89K",
  //     category: "Fitness & Health",
  //     rating: 4.6,
  //     totalSales: 890,
  //     avatar: "/placeholder.svg",
  //     description: "Fitness coach helping people achieve their health goals",
  //     products: 12,
  //     verified: true
  //   },
  //   {
  //     id: 3,
  //     name: "Sarah Wilson",
  //     handle: "@sarahw",
  //     followers: "67K",
  //     category: "Tech & Gaming",
  //     rating: 4.9,
  //     totalSales: 2100,
  //     avatar: "/placeholder.svg",
  //     description: "Tech reviewer and gaming enthusiast",
  //     products: 8,
  //     verified: false
  //   },
  //   {
  //     id: 4,
  //     name: "Alex Chen",
  //     handle: "@alexchen",
  //     followers: "156K",
  //     category: "Fashion",
  //     rating: 4.7,
  //     totalSales: 1650,
  //     avatar: "/placeholder.svg",
  //     description: "Fashion designer sharing style tips and trends",
  //     products: 22,
  //     verified: true
  //   },
  //   {
  //     id: 5,
  //     name: "Emma Davis",
  //     handle: "@emmad",
  //     followers: "234K",
  //     category: "Food & Travel",
  //     rating: 4.8,
  //     totalSales: 1890,
  //     avatar: "/placeholder.svg",
  //     description: "Food blogger and travel enthusiast",
  //     products: 18,
  //     verified: true
  //   },
  //   {
  //     id: 6,
  //     name: "Ryan Martinez",
  //     handle: "@ryanm",
  //     followers: "78K",
  //     category: "Photography",
  //     rating: 4.5,
  //     totalSales: 560,
  //     avatar: "/placeholder.svg",
  //     description: "Professional photographer and camera gear expert",
  //     products: 10,
  //     verified: false
  //   }
  // ];

  const categories = [
    "all",
    "Beauty & Lifestyle",
    "Fitness & Health", 
    "Tech & Gaming",
    "Fashion",
    "Food & Travel",
    "Photography"
  ];

  const filteredCreators = creators.filter(creator => {
    // const matchesSearch = creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //                      creator.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //                      creator.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSearch =
  (creator.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
  (creator.handle?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
  (creator.category?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "all" || creator.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const sortedCreators = [...filteredCreators].sort((a, b) => {
    switch (sortBy) {
      case "popularity":
        // return parseInt(b.followers.replace("K", "")) - parseInt(a.followers.replace("K", ""));
        return parseInt((b.followers || "0").toString().replace("K", "")) 
     - parseInt((a.followers || "0").toString().replace("K", ""));

      case "rating":
        return b.rating - a.rating;
      case "sales":
        return b.totalSales - a.totalSales;
      default:
        return 0;
    }
  });


 if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-neutral">
        <Navbar />        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Skeleton className="w-16 h-16 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-20 w-full mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }


return (
   <div className="min-h-screen bg-background">
    <Navbar />
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Hero Section */}
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-brand-text mb-4 font-playfair">
        Explore <span className="text-brand-primary">Creators</span>
      </h1>
          <p className="text-xl text-brand-text-light mb-8">
            Discover amazing creators and their curated product collections
          </p>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search creators, categories, or products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
          
           <Select value={sortBy} onValueChange={setSortBy}>
               <SelectTrigger className="w-full md:w-48">
                <span className="ml-2 font-[500]">Sort by :</span>
                 <SelectValue placeholder="Sort by" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="popularity">Followers</SelectItem>
                 <SelectItem value="rating">Rating</SelectItem>
                 <SelectItem value="sales">Sales</SelectItem>
               </SelectContent>
             </Select>
          </div>

      

        {/* Results Summary */}
        <div className="mb-4 mt-4">
          <p className="font-[700]  text-lg">
            Showing {sortedCreators.length} creator{sortedCreators.length !== 1 ? 's' : ''}
            {categoryFilter !== "all" && ` in ${categoryFilter}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Creators Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sortedCreators.map((creator) => (
        <Card
           key={creator._id}
          className="hover:shadow-lg transition-all duration-300 cursor-pointer"
          onClick={() => navigate(`/store/${creator._id}`)}
            
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
                  {creator.name.split(" ").map((n: string) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <CardTitle className="text-lg">{creator.name}</CardTitle>
                  {creator.verified && (
                    <Badge variant="default" className="bg-blue-600 text-xs">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
                <p className="text-brand-text-light text-sm">{creator.handle}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{creator.followers}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{creator.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Badge variant="secondary">{creator.category}</Badge>
              <p className="text-sm text-brand-text-light">{creator.bio || "No bio available"}</p>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Products:</span>
                <span className="font-medium">{creator.products}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Sales:</span>
                <span className="font-medium">{creator.totalSales?.toLocaleString()}</span>
              </div>

              <Button
                className="w-full bg-brand-primary hover:bg-brand-secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Creator storefront for ${creator.name} coming soon!`);
                }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Storefront
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

        {/* Empty State */}
        {sortedCreators.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-brand-primary/10 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-brand-primary" />
            </div>
            <h3 className="text-xl font-semibold text-brand-text mb-2">No creators found</h3>
            <p className="text-brand-text-light">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Browse;






// return (

//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[hsl(var(--brand-primary))] to-[hsl(var(--brand-secondary))]"></div>
//               <span className="text-2xl font-bold text-[hsl(var(--brand-text))]">MINKO</span>
//             </div>
//             <nav className="flex space-x-4">
//               <Button variant="ghost" onClick={() => navigate("/")}>Home</Button>
//               <Button variant="ghost" onClick={() => navigate("/partner")}>Partner with Us</Button>
//               <Button variant="outline" onClick={() => navigate("/login")}>Login / Sign Up</Button>
//             </nav>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Hero Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-[hsl(var(--brand-text))] mb-4">
//             Explore <span className="text-[hsl(var(--brand-primary))]">Creators</span>
//           </h1>
//           <p className="text-xl text-[hsl(var(--brand-text-light))] mb-8">
//             Discover amazing creators and their curated product collections
//           </p>
          
//           {/* Search and Filters */}
//           <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//               <Input
//                 placeholder="Search creators, categories, or products..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
            
//             <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//               <SelectTrigger className="w-full md:w-48">
//                 <Filter className="w-4 h-4 mr-2" />
//                 <SelectValue placeholder="Category" />
//               </SelectTrigger>
//               <SelectContent>
//                 {categories.map((category) => (
//                   <SelectItem key={category} value={category}>
//                     {category === "all" ? "All Categories" : category}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
            
//             <Select value={sortBy} onValueChange={setSortBy}>
//               <SelectTrigger className="w-full md:w-48">
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="popularity">Popularity</SelectItem>
//                 <SelectItem value="rating">Rating</SelectItem>
//                 <SelectItem value="sales">Sales</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         {/* Results Summary */}
//         <div className="mb-8">
//           <p className="text-[hsl(var(--brand-text-light))]">
//             Showing {sortedCreators.length} creator{sortedCreators.length !== 1 ? 's' : ''}
//             {categoryFilter !== "all" && ` in ${categoryFilter}`}
//             {searchTerm && ` matching "${searchTerm}"`}
//           </p>
//         </div>

//         {/* Creators Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {sortedCreators.map((creator) => (
//             <Card key={creator.id} className="hover:shadow-[var(--shadow-medium)] transition-all duration-300 cursor-pointer"
//                   onClick={() => navigate(`/creator/${creator.id}/storefront`)}>
//               <CardHeader>
//                 <div className="flex items-center space-x-4">
//                   <Avatar className="w-16 h-16">
//                     <AvatarImage src={creator.avatar} />
//                     <AvatarFallback>{creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
//                   </Avatar>
//                   <div className="flex-1">
//                     <div className="flex items-center space-x-2">
//                       <CardTitle className="text-lg">{creator.name}</CardTitle>
//                       {creator.verified && (
//                         <Badge variant="default" className="bg-blue-600 text-xs">
//                           ✓ Verified
//                         </Badge>
//                       )}
//                     </div>
//                     <p className="text-[hsl(var(--brand-text-light))] text-sm">{creator.handle}</p>
//                     <div className="flex items-center space-x-4 mt-2">
//                       <div className="flex items-center space-x-1">
//                         <Users className="w-4 h-4 text-muted-foreground" />
//                         <span className="text-sm font-medium">{creator.followers}</span>
//                       </div>
//                       <div className="flex items-center space-x-1">
//                         <Star className="w-4 h-4 text-yellow-500 fill-current" />
//                         <span className="text-sm font-medium">{creator.rating}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <Badge variant="secondary">{creator.category}</Badge>
//                   <p className="text-sm text-[hsl(var(--brand-text-light))]">{creator.description}</p>
                  
//                   <div className="flex justify-between text-sm">
//                     <span className="text-muted-foreground">Products:</span>
//                     <span className="font-medium">{creator.products}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-muted-foreground">Total Sales:</span>
//                     <span className="font-medium">{creator.totalSales.toLocaleString()}</span>
//                   </div>
                  
//                   <Button 
//                     className="w-full bg-[hsl(var(--brand-primary))] hover:bg-[hsl(var(--brand-primary))]/90"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       navigate(`/creator/${creator.id}/storefront`);
//                     }}
//                   >
//                     <ExternalLink className="w-4 h-4 mr-2" />
//                     Visit Storefront
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Empty State */}
//         {sortedCreators.length === 0 && (
//           <div className="text-center py-12">
//             <div className="w-24 h-24 mx-auto mb-4 bg-[hsl(var(--brand-primary))]/10 rounded-full flex items-center justify-center">
//               <Search className="w-12 h-12 text-[hsl(var(--brand-primary))]" />
//             </div>
//             <h3 className="text-xl font-semibold text-[hsl(var(--brand-text))] mb-2">No creators found</h3>
//             <p className="text-[hsl(var(--brand-text-light))]">Try adjusting your search or filters to find what you're looking for.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Browse;