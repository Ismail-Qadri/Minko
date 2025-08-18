import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Browse from "./pages/Browse";
import CreatorDashboard from "./pages/creator/CreatorDashboard";
import BrandDashboard from "./pages/brand/BrandDashboard";
import NotFound from "./pages/NotFound";
import Store from "./pages/Store";
import OrderSuccess from "./pages/OrderSuccess";
import Checkout from "./pages/checkout";
import AddProduct from "./pages/AddProduct";
import Settings from "./pages/Settings";
import BrandEditProduct from "./pages/brand/BrandEditProduct";
import BrandAddProduct from "./pages/brand/BrandAddProduct";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/creator/dashboard" element={<CreatorDashboard />} />
          <Route path="/brand/dashboard" element={<BrandDashboard />} />
          <Route path="/brand/brand-add-product" element={<BrandAddProduct/>} />
          <Route path="/brand/brand-edit-product/:productId" element={<BrandEditProduct />} />
           <Route path="/store/:id" element={<Store />} />
           <Route path="/creator/add-product" element={<AddProduct />} />
           <Route path="/checkout/:productId" element={<Checkout />} />
           <Route path="/order-success" element={<OrderSuccess /> } />
           <Route path="/creator/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
