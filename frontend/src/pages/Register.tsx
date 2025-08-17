import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, User, Building } from "lucide-react";
import Navbar from "./Navbar";

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"creator" | "brand">("creator");
  const [step, setStep] = useState(1); // 1 = register, 2 = verify
  const [verificationCode, setVerificationCode] = useState("");
  const [emailForVerification, setEmailForVerification] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    company: "",
    website: "",
    dob: "",
    gender: "",
    phone: "",
    youtube: "",
    instagram: "",
  });

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "creator" || type === "brand") {
      setUserType(type);
    }
  }, [searchParams]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  // Step 1: Register and move to verification
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: userType, email: formData.email.toLowerCase() }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmailForVerification(formData.email.toLowerCase());
        setStep(2); // Move to verification step
        alert("Verification code sent to your email!");
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify code and save to database
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!/^\d{6}$/.test(verificationCode)) {
      setError("Verification code must be a 6-digit number.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailForVerification,
          code: verificationCode,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Email verified! Account created successfully.");
        navigate(userType === "creator" ? "/creator/dashboard" : "/brand/dashboard");
      } else {
        setError(data.message || "Verification failed. Please check the code and try again.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Resend verification code
  const handleResendCode = async () => {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: userType, email: formData.email.toLowerCase() }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Verification code resent to your email!");
      } else {
        setError(data.message || "Failed to resend code.");
      }
    } catch (error) {
      console.error("Resend code error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--background))] to-[hsl(var(--brand-neutral))] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-[var(--shadow-medium)]">
            <CardHeader>
              <CardTitle className="text-center font-[Georgia] text-[1.8rem]">
                {step === 1 ? "Register" : "Verify Email"}
              </CardTitle>
              {step === 1 && (
                <Tabs
                  value={userType}
                  onValueChange={(value) => setUserType(value as "creator" | "brand")}
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="creator" className="flex items-center gap-2">
                      <User className="w-4 h-4" /> Creator
                    </TabsTrigger>
                    <TabsTrigger value="brand" className="flex items-center gap-2">
                      <Building className="w-4 h-4" /> Brand
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              )}
            </CardHeader>
            <CardContent>
              {error && (
                <p className="text-red-500 text-sm text-center mb-4">{error}</p>
              )}
              {step === 1 ? (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{userType === "creator" ? "Full Name" : "Brand Name"}</Label>
                    <Input
                      id="name"
                      placeholder={userType === "creator" ? "Enter full name" : "Enter brand name"}
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>

                  {userType === "creator" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input
                          id="dob"
                          type="date"
                          value={formData.dob}
                          onChange={(e) => handleInputChange("dob", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <select
                          id="gender"
                          value={formData.gender}
                          onChange={(e) => handleInputChange("gender", e.target.value)}
                          className="w-full border border-input rounded-md px-3 py-2 text-sm"
                          required
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>

                  {userType === "brand" && (
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        placeholder="Enter company name"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      placeholder="Your website URL"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram Profile</Label>
                    <Input
                      id="instagram"
                      placeholder="Your Instagram"
                      value={formData.instagram}
                      onChange={(e) => handleInputChange("instagram", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="youtube">YouTube Channel</Label>
                    <Input
                      id="youtube"
                      placeholder="Your YouTube channel"
                      value={formData.youtube}
                      onChange={(e) => handleInputChange("youtube", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">{userType === "creator" ? "Bio" : "Brand Description"}</Label>
                    <Textarea
                      id="bio"
                      placeholder={userType === "creator" ? "Tell us about yourself..." : "Describe your brand..."}
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[hsl(var(--brand-primary))] hover:bg-[hsl(var(--brand-primary))]/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Registering..." : `Create ${userType === "creator" ? "Creator" : "Brand"} Account`}
                  </Button>

                  <div className="mt-4 text-center">
                    <p className="text-sm text-[hsl(var(--brand-text-light))]">
                      Already have an account?{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto text-[hsl(var(--brand-primary))]"
                        onClick={() => navigate("/login")}
                      >
                        Sign in
                      </Button>
                    </p>
                  </div>

                  <div className="mt-2 text-center">
                    <Button
                      variant="ghost"
                      className="text-[hsl(var(--brand-text-light))]"
                      onClick={() => navigate("/")}
                    >
                      ← Back to Home
                    </Button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerify} className="space-y-4">
                  <h2 className="text-center font-semibold text-lg">
                    Enter Verification Code
                  </h2>
                  <p className="text-center text-sm text-[hsl(var(--brand-text-light))]">
                    A code was sent to {emailForVerification}
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="verificationCode">Verification Code</Label>
                    <Input
                      id="verificationCode"
                      placeholder="Enter 6-digit code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      required
                      maxLength={6}
                      pattern="\d{6}"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[hsl(var(--brand-primary))] hover:bg-[hsl(var(--brand-primary))]/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Verifying..." : "Verify Email"}
                  </Button>
                  <div className="mt-2 text-center">
                    <Button
                      variant="link"
                      className="text-[hsl(var(--brand-text-light))]"
                      onClick={handleResendCode}
                      disabled={isLoading}
                    >
                      Resend Code
                    </Button>
                  </div>
                  <div className="mt-2 text-center">
                    <Button
                      variant="ghost"
                      className="text-[hsl(var(--brand-text-light))]"
                      onClick={() => setStep(1)}
                    >
                      ← Back to Register
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Register;




// import { useState, useEffect } from "react";
// import { Button } from "../components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";
// import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
// import { Textarea } from "../components/ui/textarea";
// import { useNavigate, useSearchParams } from "react-router-dom/dist";
// import { Eye, EyeOff, User, Building } from "lucide-react";
// import Navbar from "./Navbar";

// const Register = () => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const [showPassword, setShowPassword] = useState(false);
//   const [userType, setUserType] = useState<"creator" | "brand">("creator");
//   const [step, setStep] = useState(1); // 1 = register, 2 = verify code
//   const [verificationCode, setVerificationCode] = useState("");
//   const [emailForVerification, setEmailForVerification] = useState("");

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     bio: "",
//     company: "",
//     website: "",
//     dob: "",
//     gender: "",
//     phone: "",
//     platform: "",
//     youtube: "",
//     instagram: "",
//   });

//   useEffect(() => {
//     const type = searchParams.get("type");
//     if (type === "creator" || type === "brand") {
//       setUserType(type);
//     }
//   }, [searchParams]);

//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   // Step 1: Register and send verification email
//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords don't match!");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/api/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...formData, type: userType }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Verification code sent to your email!");
//         setStep(2);
//         setEmailForVerification(formData.email); // save email for verification step
//       } else {
//         alert(data.message || "Registration failed.");
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
//       alert("Something went wrong. Try again.");
//     }
//   };

//   // Step 2: Verify code
//   const handleVerify = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/api/verify", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: emailForVerification,
//           code: verificationCode,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Email verified! Account created successfully.");
//         navigate(userType === "creator" ? "/creator/dashboard" : "/brand/dashboard");
//       } else {
//         alert(data.message || "Verification failed.");
//       }
//     } catch (error) {
//       console.error("Verification error:", error);
//       alert("Something went wrong. Try again.");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--background))] to-[hsl(var(--brand-neutral))] flex items-center justify-center p-4">
//         <div className="w-full max-w-md">
//           <Card className="shadow-[var(--shadow-medium)]">
//             <CardHeader>
//               <CardTitle className="text-center font-[Georgia] text-[1.8rem]">Register</CardTitle>
//               <Tabs
//                 value={userType}
//                 onValueChange={(value) => setUserType(value as "creator" | "brand")}
//               >
//                 <TabsList className="grid w-full grid-cols-2">
//                   <TabsTrigger value="creator" className="flex items-center gap-2">
//                     <User className="w-4 h-4" /> Creator
//                   </TabsTrigger>
//                   <TabsTrigger value="brand" className="flex items-center gap-2">
//                     <Building className="w-4 h-4" /> Brand
//                   </TabsTrigger>
//                 </TabsList>
//               </Tabs>
//             </CardHeader>
//             <CardContent>
//               {step === 1 ? (
//                 <form onSubmit={handleRegister} className="space-y-4">
//                   {/* Name */}
//                   <Label htmlFor="name">{userType === "creator" ? "Full Name" : "Brand Name"}</Label>
//                   <Input
//                     id="name"
//                     placeholder={userType === "creator" ? "Enter full name" : "Enter brand name"}
//                     value={formData.name}
//                     onChange={(e) => handleInputChange("name", e.target.value)}
//                     required
//                   />

//                   {/* Email */}
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="Enter your email"
//                     value={formData.email}
//                     onChange={(e) => handleInputChange("email", e.target.value)}
//                     required
//                   />

//                   {/* DOB & Gender */}
//                   {userType === "creator" && (
//                     <>
//                       <Label htmlFor="dob">Date of Birth</Label>
//                       <Input
//                         id="dob"
//                         type="date"
//                         value={formData.dob}
//                         onChange={(e) => handleInputChange("dob", e.target.value)}
//                         required
//                       />
//                       <Label htmlFor="gender">Gender</Label>
//                       <select
//                         id="gender"
//                         value={formData.gender}
//                         onChange={(e) => handleInputChange("gender", e.target.value)}
//                         className="w-full border border-input rounded-md px-3 py-2 text-sm"
//                         required
//                       >
//                         <option value="">Select gender</option>
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                         <option value="other">Other</option>
//                       </select>
//                     </>
//                   )}

//                   {/* Phone */}
//                   <Label htmlFor="phone">Phone Number</Label>
//                   <Input
//                     id="phone"
//                     type="tel"
//                     placeholder="Enter phone number"
//                     value={formData.phone}
//                     onChange={(e) => handleInputChange("phone", e.target.value)}
//                     required
//                   />

//                   {/* Company */}
//                   {userType === "brand" && (
//                     <>
//                       <Label htmlFor="company">Company Name</Label>
//                       <Input
//                         id="company"
//                         placeholder="Enter company name"
//                         value={formData.company}
//                         onChange={(e) => handleInputChange("company", e.target.value)}
//                       />
//                     </>
//                   )}

//                   {/* Website */}
//                   <Label htmlFor="website">Website</Label>
//                   <Input
//                     id="website"
//                     placeholder="Your website URL"
//                     value={formData.website}
//                     onChange={(e) => handleInputChange("website", e.target.value)}
//                   />

//                   {/* Social */}
//                   <Label htmlFor="instagram">Instagram Profile</Label>
//                   <Input
//                     id="instagram"
//                     placeholder="Your Instagram"
//                     value={formData.instagram}
//                     onChange={(e) => handleInputChange("instagram", e.target.value)}
//                   />
//                   <Label htmlFor="youtube">YouTube Channel</Label>
//                   <Input
//                     id="youtube"
//                     placeholder="Your YouTube channel"
//                     value={formData.youtube}
//                     onChange={(e) => handleInputChange("youtube", e.target.value)}
//                   />

//                   {/* Bio */}
//                   <Label htmlFor="bio">{userType === "creator" ? "Bio" : "Brand Description"}</Label>
//                   <Textarea
//                     id="bio"
//                     placeholder={userType === "creator" ? "Tell us about yourself..." : "Describe your brand..."}
//                     value={formData.bio}
//                     onChange={(e) => handleInputChange("bio", e.target.value)}
//                     rows={3}
//                   />

//                   {/* Password */}
//                   <Label htmlFor="password">Password</Label>
//                   <div className="relative">
//                     <Input
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Create a password"
//                       value={formData.password}
//                       onChange={(e) => handleInputChange("password", e.target.value)}
//                       required
//                     />
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                     </Button>
//                   </div>

//                   {/* Confirm Password */}
//                   <Label htmlFor="confirmPassword">Confirm Password</Label>
//                   <Input
//                     id="confirmPassword"
//                     type="password"
//                     placeholder="Confirm password"
//                     value={formData.confirmPassword}
//                     onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
//                     required
//                   />

//                   <Button type="submit" className="w-full">
//                     Create {userType === "creator" ? "Creator" : "Brand"} Account
//                   </Button>
//                 </form>
//               ) : (
//                 <form onSubmit={handleVerify} className="space-y-4">
//                   <h2 className="text-center font-semibold text-lg">Enter Verification Code</h2>
//                   <Input
//                     placeholder="Verification code"
//                     value={verificationCode}
//                     onChange={(e) => setVerificationCode(e.target.value)}
//                     required
//                   />
//                   <Button type="submit" className="w-full">
//                     Verify Email
//                   </Button>
//                 </form>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;
