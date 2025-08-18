
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import axios from "axios";

const CreatorStore = () => {
  const { creatorId } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (creatorId) {
      fetchCreatorData();
      fetchCreatorProducts();
    }
  }, [creatorId]);

  const fetchCreatorData = async () => {
    try {
      const response = await axios.get(`/api/creators/${creatorId}`);
      setCreator(response.data);
    } catch (err) {
      console.error("Error fetching creator:", err);
    }
  };

  const fetchCreatorProducts = async () => {
    try {
      const response = await axios.get(`/api/creators/${creatorId}/products`);
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = () => {
    alert("Follow functionality coming soon!");
  };

  const handleShareStore = () => {
    const storeUrl = window.location.href;
    navigator.clipboard.writeText(storeUrl);
    alert("Store link copied to clipboard!");
  };

  const handleBuyNow = (product: any) => {
    alert(`Redirecting to purchase ${product.name}...`);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this creator?")) {
      alert("Delete functionality for admin only!");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading store...</div>;
  }

  if (!creator) {
    return <div className="min-h-screen flex items-center justify-center">Creator not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="creator-store max-w-6xl mx-auto px-4 py-8">
        <div className="creator-header mb-8">
          <div className="flex justify-between items-start mb-6">
            <Button variant="outline" onClick={() => navigate(-1)}>
              ← Back
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete this Creator
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={creator.avatar || 'https://cdn-icons-png.flaticon.com/512/3408/3408557.png'}
              alt={creator.fullName}
              className="creator-avatar w-32 h-32 rounded-full object-cover"
            />
            <div className="creator-info text-center md:text-left">
              <h2 className="creator-name text-3xl font-bold mb-2">{creator.fullName || creator.username}</h2>
              <p className="creator-username text-xl text-muted-foreground mb-2">@{creator.username}</p>
              {creator.bio && <p className="creator-bio text-lg mb-4 max-w-2xl">{creator.bio}</p>}
              <div className="basic-details grid grid-cols-2 gap-4 text-sm">
                {creator.gender && <p><strong>Gender:</strong> {creator.gender}</p>}
                {creator.dob && <p><strong>DOB:</strong> {creator.dob}</p>}
                {creator.phone && <p><strong>Phone:</strong> {creator.phone}</p>}
                {creator.email && <p><strong>Email:</strong> {creator.email}</p>}
              </div>
            </div>
          </div>
        </div>

        {(creator.instagram || creator.youtube || creator.facebook) && (
          <div className="social-media mb-8">
            <h3 className="text-2xl font-bold mb-4">Featured Social Media</h3>
            <div className="social-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creator.instagram && (
                <div className="social-frame border rounded-lg overflow-hidden">
                  <iframe 
                    src={creator.instagram} 
                    className="w-full h-64" 
                    title="Instagram"
                    loading="lazy"
                  />
                </div>
              )}
              {creator.youtube && (
                <div className="social-frame border rounded-lg overflow-hidden">
                  <iframe 
                    src={creator.youtube} 
                    className="w-full h-64" 
                    title="YouTube"
                    loading="lazy"
                  />
                </div>
              )}
              {creator.facebook && (
                <div className="social-frame border rounded-lg overflow-hidden">
                  <iframe 
                    src={creator.facebook} 
                    className="w-full h-64" 
                    title="Facebook"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <div className="products-section mb-8">
          <h3 className="products-title text-2xl font-bold mb-6">Products</h3>

          {products.length > 0 ? (
            <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div key={index} className="product-card bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={product.image || product.productImage || 'https://via.placeholder.com/300x200'}
                    className="product-image w-full h-48 object-cover"
                    alt={product.name || 'Product'}
                  />
                  <div className="p-4">
                    <h4 className="product-name font-semibold text-lg mb-2 line-clamp-1">{product.name}</h4>
                    <p className="product-description text-muted-foreground text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    {product.price && (
                      <p className="product-price font-bold text-lg mb-3">${product.price}</p>
                    )}
                    {product.category && (
                      <Badge variant="secondary" className="mb-3">{product.category}</Badge>
                    )}
                    <Button 
                      className="buy-button w-full bg-[hsl(var(--brand-primary))] hover:bg-[hsl(var(--brand-primary))]/90"
                      onClick={() => handleBuyNow(product)}
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-products text-center py-12">
              <p className="text-muted-foreground text-lg">No products available</p>
            </div>
          )}
        </div>

        <div className="footer-buttons flex justify-center space-x-4">
          <Button 
            className="action-button bg-[hsl(var(--brand-primary))] hover:bg-[hsl(var(--brand-primary))]/90"
            onClick={handleFollow}
          >
            Follow
          </Button>
          <Button 
            variant="outline"
            className="action-button"
            onClick={handleShareStore}
          >
            Share Store
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatorStore;
