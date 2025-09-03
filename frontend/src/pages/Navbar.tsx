import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoImg from "../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);

  // Detect login state from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setUserType(localStorage.getItem("userType"));
  }, [location.pathname]); // Re-check on route change

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const navItems: { name: string; path?: string; action?: () => void }[] = [
    { name: "Explore Creators", path: "/browse" },
    ...(isLoggedIn && userType === "creator"
      ? [{ name: "Dashboard", path: "/creator/dashboard" }]
      : []),
    ...(isLoggedIn && userType === "brand"
      ? [{ name: "Dashboard", path: "/brand/dashboard" }]
      : []),
    ...(!isLoggedIn && !isAuthPage
      ? [{ name: "Login / Sign Up", path: "/login" }]
      : []),
    ...(isLoggedIn
      ? [{ name: "Logout", action: handleLogout }]
      : []),
  ];

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-10xl px-4 sm:px-6 lg:px-10 mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand - always clickable to landing page */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/")}
            role="button"
            tabIndex={0}
            style={{ userSelect: "none" }}
          >
            <img
              src={logoImg}
              alt="Logo"
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="text-xl font-bold text-[hsl(var(--brand-text))]">
              MINKO
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  if (item.action) item.action();
                  else if (item.path) navigate(item.path);
                }}
                className="px-4 py-2 rounded-md text-sm font-medium text-black transition hover:bg-[hsl(var(--brand-primary)/0.5)]"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 space-y-2">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsMenuOpen(false);
                  if (item.action) item.action();
                  else if (item.path) navigate(item.path);
                }}
                className="w-full text-right px-4 py-2 rounded-md text-sm font-medium text-black transition hover:bg-[hsl(var(--brand-primary)/0.5)]"
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
