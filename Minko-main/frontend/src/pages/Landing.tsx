import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Star, Users, TrendingUp, Package, Zap } from "lucide-react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import demoVideo from "../assets/mixkit.mp4"; // your influencer demo video
import logoImg from "../assets/logo.png"; // Adjust the path as necessary
import homeBanner from "../assets/home-banner.jpeg";
import { Menu, X } from "lucide-react"; // icon library
import Navbar from "./Navbar";

const features = [
  {
    icon: Star,
    title: "Personalized Storefronts",
    description:
      "Creators can design and customize their storefronts to reflect their personal brand.",
  },
  {
    icon: TrendingUp,
    title: "Real ROI Tracking",
    description:
      "Brands can monitor engagement, conversions, and ROI through integrated analytics.",
  },
  {
    icon: Users,
    title: "Brand-Creator Collaboration",
    description:
      "Our platform connects you with the right creators or brands to amplify your reach.",
  },
  {
    icon: Package,
    title: "Curated Product Integration",
    description:
      "Easily feature and sell recommended products from verified brands.",
  },
];

// const mapContainerStyle = {
//   width: "100%",
//   height: "200px",
// };

// const minkoLocation = {
//   lat: 28.5385,
//   lng: 77.3366,
// };

export default function Landing() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="font-['Montserrat'] bg-[#f7f5f1] text-[#3d3d3d]">
      <Navbar />
      
      {/* Hero Video Section */}
      {/* <section className="relative w-full h-screen overflow-hidden">
  <video
    src={demoVideo}
    autoPlay
    muted
    loop
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover"
    />
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center bg-black bg-opacity-40">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            <b>Start Your Creator Journey with MINKO</b>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-xl text-white max-w-2xl mb-8"
          >

           <div className="bg-[rgba(213,207,202,0.6)] border-l-[6px] border-[#a77c44] p-2 md:p-3 mb-[70px] mt-5 max-w-[700px] rounded-xl shadow-[0_10px_30px_rgba(167,124,68,0.1)] font-[Playfair_Display] text-[1.3rem] leading-[1.8] text-[#302e2e] relative">
      <p className="m-0 p-0">
        <span className="text-[#f0f0f0] font-semibold">Turn your content into a career</span> —{" "}
        <strong className="text-[#a77c44] font-bold">inspire</strong>,{" "}
        <strong className="text-[#a77c44] font-bold">grow</strong>, and{" "}
        <strong className="text-[#a77c44] font-bold">get paid</strong>{" "}
        <span className="text-[#f0f0f0] font-semibold">doing what you love.</span>
      </p>
    </div>
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#b1976b] hover:bg-[#a77c44] text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition"
            onClick={() => navigate("/register")}
          >
            Join as a Creator
          </motion.button>
        </div>
      </section> */}

      <section className="relative w-full h-screen overflow-hidden">
        <video
          src={demoVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center bg-black bg-opacity-40">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            <b>Start Your Creator Journey with MINKO</b>
            {/* Create. Share. Thrive — with <span className="text-[#e1c392]">MINKO</span> */}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-xl text-white max-w-2xl mb-8"
          >
            <div className="bg-[rgba(213,207,202,0.7)] border-l-[6px] border-[#a77c44] p-3 md:p-4 mb-10 mt-5 max-w-[700px] rounded-xl shadow-[0_10px_30px_rgba(167,124,68,0.1)] font-[Playfair_Display] text-[1.3rem] leading-[1.8] text-[#302e2e]">
              <p className="m-0 p-0">
                <span className="text-[#] font-semibold">
                  Your journey starts here
                </span>{" "}
                — <strong className="text-[#a77c44] font-bold">capture</strong>,{" "}
                <strong className="text-[#a77c44] font-bold">connect</strong>,
                and{" "}
                <strong className="text-[#a77c44] font-bold">
                  create impact
                </strong>{" "}
                <span className="text-[#] font-semibold">with every post.</span>
              </p>
            </div>
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#b1976b] hover:bg-[#a77c44] text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition"
            onClick={() => navigate("/register")}
          >
            Join as a Creator
          </motion.button>
        </div>
      </section>

      {/* Intro Section */}
      <section className="text-center px-6 py-16 bg-white">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-['Playfair_Display'] font-bold mb-4"
        >
          Who is <span className="italic text-[#b1976b]">MINKO</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-3xl mx-auto text-lg text-[#5e5e5e] leading-8"
        >
          We’re a creator‑commerce platform empowering influencers and content
          creators to monetize their content. Launch your storefront,
          collaborate with brands, and track real ROI.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6"
        >
          {/* <button
            className="border-2 border-[#3d3d3d] text-[#3d3d3d] hover:bg-[#7b633e] hover:text-white font-semibold py-2 px-6 rounded-full transition"
            onClick={() => navigate("/learn-more")}
          >
            Learn More
          </button> */}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[hsl(var(--brand-neutral))]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[hsl(var(--brand-text))] mb-4">
              Why Choose{" "}
              <span className="text-[hsl(var(--brand-primary))]">MINKO</span>?
            </h2>
            <p className="text-xl text-[hsl(var(--brand-text-light))]">
              MINKO isn't just a platform — it's a creator economy ecosystem.
            </p>
            <p className="text-lg text-[hsl(var(--brand-text-light))] mt-2">
              Here's what makes us different:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-card border-border shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-[hsl(var(--brand-primary))]/10 rounded-full flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-[hsl(var(--brand-primary))]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[hsl(var(--brand-text))] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[hsl(var(--brand-text-light))] text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[hsl(var(--brand-text))] mb-8">
            Ready to Start Your Journey?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-[hsl(var(--brand-primary))]/5 to-[hsl(var(--brand-secondary))]/5 border-[hsl(var(--brand-primary))]/20">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-[hsl(var(--brand-primary))]" />
                <h3 className="text-xl font-semibold mb-4">I'm a Creator</h3>
                <p className="text-[hsl(var(--brand-text-light))] mb-6">
                  Start your own storefront and monetize your content
                </p>
                <Button
                  className="w-full bg-[#b1976b] hover:bg-[#a77c44] text-white font-semibold"
                  onClick={() => navigate("/register?type=creator")}
                >
                  Join as Creator
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[hsl(var(--brand-secondary))]/5 to-[hsl(var(--brand-accent))]/5 border-[hsl(var(--brand-secondary))]/20">
              <CardContent className="p-8 text-center">
                <Zap className="w-12 h-12 mx-auto mb-4 text-[hsl(var(--brand-secondary))]" />
                <h3 className="text-xl font-semibold mb-4">I'm a Brand</h3>
                <p className="text-[hsl(var(--brand-text-light))] mb-6">
                  Connect with creators and track your marketing ROI
                </p>
                <Button
                  className="w-full bg-[#b1976b] hover:bg-[#a77c44] text-white font-semibold"
                  onClick={() => navigate("/register?type=brand")}
                >
                  Join as Brand
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="w-full bg-white flex justify-center items-center px-6 py-20">
        <motion.form
          action="https://getform.io/f/bdrnjvlb"
          method="POST"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <p className="text-xl italic font-semibold text-[#a87436] border-b border-[#ad8b54] inline-block mb-2">
              "Influencer? Creator? Superstar in the Making? Let’s Talk."
            </p>
            <p className="text-sm text-[#656565] max-w-md mx-auto leading-relaxed">
              We’re here to support your journey — questions, collabs, or just a
              hello.
            </p>
          </div>
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            required
            className="w-full p-4 mb-4 bg-[#f9f9f9] border rounded-xl"
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            required
            className="w-full p-4 mb-4 bg-[#f9f9f9] border rounded-xl"
          />
          <textarea
            name="message"
            rows={6}
            placeholder="Your Message"
            required
            className="w-full p-4 mb-6 bg-[#f9f9f9] border rounded-xl"
          ></textarea>
          <button
            type="submit"
            // className="w-full py-3 bg-gradient-to-r from-[#ad8550] to-[#ba9d77] text-white rounded-full hover:bg-[#fff] transition"
            className="w-full bg-[#b1976b] hover:bg-[#a77c44] text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition"
          >
            Send Message
          </button>
        </motion.form>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-[#f7f5f1] text-[#787878] text-sm">
        {/* <div className="space-x-10 text-sm mb-1 font-semibold">
          <a href="/about" className="hover:underline">
            About
          </a>
          <a href="/terms" className="hover:underline">
            Terms
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </div> */}
        &copy; <b>2025 MINKO. All rights reserved.</b>
      </footer>

      {/* {Footer} */}
      {/* <section>
        <div
      id="contact"
      className="flex flex-col md:flex-row justify-evenly gap-6 md:gap-0 px-4 py-10 text-white font-sans bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500"
    >
      <div className="md:w-1/3">
        <h1 className="text-2xl font-bold mb-3">About Minko</h1>
        <p className="italic">
          "Minko is your one-stop platform built exclusively for influencers and content creators. Discover brands, showcase your portfolio, and collaborate seamlessly — all in one place."
        </p>
      </div>

      <div className="md:w-1/3">
        <h1 className="text-2xl font-bold mb-3">Contact Us</h1>
        <p>📍 Location: Noida, Sector 126</p>
        <p>📧 Email: support@minko.in</p>
        <p>📞 Phone: +91-98765-43210</p>
      </div>
      <div className="md:w-1/3">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={minkoLocation}
            zoom={15}
          >
            <Marker position={minkoLocation} />
          </GoogleMap>
        </LoadScript>
      </div>
      </div>

      </section> */}
    </main>
  );
}
