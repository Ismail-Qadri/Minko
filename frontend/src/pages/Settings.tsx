// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function Settings() {
//   const [formData, setFormData] = useState<any>({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:5000/api/profile", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setFormData(res.data);
//       } catch (err) {
//         console.error("❌ Error fetching profile:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(`http://localhost:5000/api/users/${formData._id}`, formData, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       alert("Profile updated!");
//     } catch (err) {
//       console.error("❌ Error updating profile:", err);
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="max-w-lg mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//   <input name="name" value={formData.name || ""} onChange={handleChange} placeholder="Name" />
//   <input name="handle" value={formData.handle || ""} onChange={handleChange} placeholder="Handle" />
//   <textarea name="bio" value={formData.bio || ""} onChange={handleChange} placeholder="Bio" />
//   <input name="followers" value={formData.followers || ""} onChange={handleChange} placeholder="Followers" />
//   <input name="category" value={formData.category || ""} onChange={handleChange} placeholder="Category" />
//   <input name="rating" value={formData.rating || ""} onChange={handleChange} placeholder="Rating" />
//   <input name="instagram" value={formData.instagram || ""} onChange={handleChange} placeholder="Instagram" />
//   <input name="youtube" value={formData.youtube || ""} onChange={handleChange} placeholder="YouTube" />
//   <input name="company" value={formData.company || ""} onChange={handleChange} placeholder="Company" />
//   <input name="website" value={formData.website || ""} onChange={handleChange} placeholder="Website" />
//   <input name="dob" value={formData.dob || ""} onChange={handleChange} placeholder="Date of Birth" />
//   <input name="gender" value={formData.gender || ""} onChange={handleChange} placeholder="Gender" />
//   <input name="phone" value={formData.phone || ""} onChange={handleChange} placeholder="Phone" />
//   <input name="platform" value={formData.platform || ""} onChange={handleChange} placeholder="Platform" />
//   <input name="image" value={formData.image || ""} onChange={handleChange} placeholder="Profile Image URL" />
//   <button type="submit">Save Changes</button>
// </form>

//     </div>
//   );
// }




import React, { useState } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("edit-profile");

  const tabs = [
    { id: "edit-profile", label: "Edit Profile" },
    { id: "bank-details", label: "Bank Details" },
    { id: "account", label: "Account" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === tab.id
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "edit-profile" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="border p-2 rounded w-full"
              />
              <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded w-full"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Save Changes
              </button>
            </form>
          </div>
        )}

        {activeTab === "bank-details" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Bank Details</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Bank Name"
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Account Number"
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="IFSC Code"
                className="border p-2 rounded w-full"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Save Bank Details
              </button>
            </form>
          </div>
        )}

        {activeTab === "account" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Account</h2>
            <p className="text-gray-600 mb-4">
              Manage your account settings and privacy options here.
            </p>
            <button className="bg-red-500 text-white px-4 py-2 rounded">
              Delete Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
