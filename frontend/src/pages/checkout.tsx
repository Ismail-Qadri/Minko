import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useLocation, useRoute } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ShoppingCart, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Demo product data - replace with your API
const demoProducts: { [key: string]: any } = {
  "1": {
    id: "1",
    name: "Signature Skincare Set",
    description: "My personal 3-step skincare routine that keeps my skin glowing.",
    price: "89.99",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
    category: "Beauty"
  },
  "2": {
    id: "2",
    name: "Premium Workout Bundle", 
    description: "Everything you need for home workouts.",
    price: "129.99",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
    category: "Fitness"
  },
  "3": {
    id: "3",
    name: "Photography Presets Pack",
    description: "10 professional Lightroom presets.",
    price: "29.99", 
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=300&fit=crop",
    category: "Digital"
  },
  "4": {
    id: "4",
    name: "Travel Essentials Kit",
    description: "My must-have travel accessories.",
    price: "79.99",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=300&fit=crop",
    category: "Travel"
  }
};

const checkoutSchema = z.object({
  customerName: z.string().min(1, "Name is required"),
  customerEmail: z.string().email("Valid email is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const [, paramsRaw] = useRoute("/checkout/:productId");
  const params: { productId?: string } = paramsRaw ?? {};
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const productId = params.productId;
  const urlParams = new URLSearchParams(window.location.search);
  const creatorId = urlParams.get('creatorId');
  
  const product = productId ? demoProducts[productId] : null;

  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      quantity: 1,
    },
  });

  const quantity = form.watch("quantity");
  const subtotal = product ? parseFloat(product.price) * quantity : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const onSubmit = async (data: CheckoutForm) => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to success page
      setLocation(`/order-success?orderId=demo-order-${Date.now()}&productName=${encodeURIComponent(product?.name || '')}`);
      
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-neutral flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600 mb-4">Product not found</p>
            <Button onClick={() => setLocation("/browse")}>
              Back to Browse
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-neutral">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setLocation(`/store/${creatorId}`)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Store
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary"></div>
                <span className="text-2xl font-bold text-brand-text font-georgia">MINKO</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-brand-primary" />
              <span className="font-medium">Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Checkout Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="customerName">Full Name</Label>
                      <Input
                        id="customerName"
                        {...form.register("customerName")}
                        placeholder="Enter your full name"
                      />
                      {form.formState.errors.customerName && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.customerName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="customerEmail">Email Address</Label>
                      <Input
                        id="customerEmail"
                        type="email"
                        {...form.register("customerEmail")}
                        placeholder="Enter your email"
                      />
                      {form.formState.errors.customerEmail && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.customerEmail.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        {...form.register("quantity", { valueAsNumber: true })}
                      />
                      {form.formState.errors.quantity && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.quantity.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Payment Method</h3>
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          Demo Mode - No actual payment will be processed
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-brand-primary hover:bg-brand-primary/90"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Complete Purchase - ${total.toFixed(2)}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                    <Badge variant="secondary" className="mt-1">{product.category}</Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Price per item:</span>
                    <span>${product.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span>{quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-800 text-sm">
                    🔒 Secure checkout powered by Stripe
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;