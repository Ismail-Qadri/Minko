import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { CheckCircle, Download, Share2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OrderSuccess = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get('orderId');
  const productName = urlParams.get('productName');

  useEffect(() => {
    // Simulate order confirmation
    toast({
      title: "Order Confirmed!",
      description: "You'll receive an email confirmation shortly.",
    });
  }, [toast]);

  const handleShare = () => {
    const shareText = `Just purchased ${productName} from MINKO! 🛍️`;
    if (navigator.share) {
      navigator.share({
        title: 'MINKO Purchase',
        text: shareText,
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied!",
        description: "Share text copied to clipboard",
      });
    }
  };

  return (
    <div className="min-h-screen bg-brand-neutral">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary"></div>
              <span className="text-2xl font-bold text-brand-text font-georgia">MINKO</span>
            </div>
            <nav className="flex space-x-4">
              <Button variant="ghost" onClick={() => setLocation("/")}>Home</Button>
              <Button variant="ghost" onClick={() => setLocation("/browse")}>Browse</Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-brand-text mb-2">Order Successful!</h1>
          <p className="text-gray-600">Thank you for your purchase. Your order has been confirmed.</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Order Details</span>
              <Badge variant="secondary">Confirmed</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Order Information</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-mono">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Confirmed
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Product</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Item:</span>
                    <span className="font-medium">{decodeURIComponent(productName || '')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery:</span>
                    <span>Instant Download</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">1</div>
                <div>
                  <p className="font-medium">Check Your Email</p>
                  <p className="text-sm text-gray-600">We've sent order confirmation and download links to your email.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">2</div>
                <div>
                  <p className="font-medium">Download Your Purchase</p>
                  <p className="text-sm text-gray-600">Access your digital products immediately through the download link.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">3</div>
                <div>
                  <p className="font-medium">Enjoy Your Product</p>
                  <p className="text-sm text-gray-600">Start using your new purchase and don't forget to share your experience!</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600 mb-4">
                If you have any questions about your order or need assistance, we're here to help.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download Product (Demo)
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Your Purchase
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={() => setLocation("/browse")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
          <Button onClick={() => setLocation("/")} className="bg-brand-primary hover:bg-brand-primary/90">
            Back to Home
          </Button>
        </div>

        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Thank you for supporting creators on MINKO! 🎉
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;