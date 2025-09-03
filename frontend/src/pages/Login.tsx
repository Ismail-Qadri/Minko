import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useNavigate } from "react-router-dom/dist";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logoImg from "../assets/logo.png";
import Navbar from "./Navbar";


const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"creator" | "brand">("creator");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        type: userType,
      }),
    });

    const data = await response.json();
    console.log("login", data);

    if (response.ok) {
      localStorage.setItem("token", data.token);
      console.log("login token:", data.token);
      if (data.user && data.user._id && data.user.type) {
        localStorage.setItem("userId", data.user._id);
        localStorage.setItem("userType", data.user.type);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login successful!");
        if (data.user.type === "creator") {
          navigate(`/creator/dashboard/`);
        } else {
          navigate(`/brand/dashboard/${data.user._id}`);
        }
      } else {
        alert("Login successful, but user data missing. Please try again.");
        navigate("/");
      }
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Something went wrong. Please try again.");
  }
};


  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--background))] to-[hsl(var(--brand-neutral))] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
                 
          <h1 className="text-2xl font-bold text-[hsl(var(--brand-text))] mb-2">Welcome Back</h1>
          <p className="text-[hsl(var(--brand-text-light))]">Sign in to your account</p>
        </div>

        <Card className="shadow-[var(--shadow-medium)]">
          <CardHeader>
            <CardTitle className="text-center">Login</CardTitle>
            <Tabs value={userType} onValueChange={(value) => setUserType(value as "creator" | "brand")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="creator">Creator</TabsTrigger>
                <TabsTrigger value="brand">Brand</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[hsl(var(--brand-primary))] hover:bg-[hsl(var(--brand-primary))]/90"
              >
                Sign In as {userType === "creator" ? "Creator" : "Brand"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-[hsl(var(--brand-text-light))]">
                Don't have an account?{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-[hsl(var(--brand-primary))]"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </Button>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Button 
                variant="ghost" 
                className="text-[hsl(var(--brand-text-light))]"
                onClick={() => navigate("/")}
              >
                ← Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
};

export default Login;