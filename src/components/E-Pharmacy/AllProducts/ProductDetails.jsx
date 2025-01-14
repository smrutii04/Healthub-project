import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useCart } from '../Cart/CartContext';
import './ProductDetails.css';
import axios from 'axios'; // import axios to make API calls
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // Import star icons for rating

export default function ProductDetails() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortPrice, setSortPrice] = useState('');
  const categories = ['Pain Relief', 'Cold & Cough', 'Vitamins']; // Example categories

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:5000/medicines");
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.log('Error fetching products: ', error);
      }
    }
    fetchProducts();
  }, []); // Empty dependency array to run this effect once on component mount

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSortPriceChange = (event) => {
    setSortPrice(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    selectedCategory ? product.category === selectedCategory : true
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortPrice === 'asc') return parseFloat(a.MRP.replace('₹', '')) - parseFloat(b.MRP.replace('₹', ''));
    if (sortPrice === 'desc') return parseFloat(b.MRP.replace('₹', '')) - parseFloat(a.MRP.replace('₹', ''));
    return 0;
  });

  // Render stars based on rating value
  const renderStars = (rating) => {
    const validRating = Number(rating); // Convert to a number

    if (isNaN(validRating) || validRating < 0 || validRating > 5) {
      return null; // Return null if the rating is invalid
    }

    const fullStars = Math.floor(validRating);
    const halfStars = validRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStars ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} />)}
        {halfStars && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} />)}
      </>
    );
  };

  return (
    <div className="product-details-page">
      <div className="sidebar">
        <h3>Filter & Sort</h3>
        <FormControl fullWidth>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={selectedCategory}
            label="Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="price-select-label text-color">Sort by Price</InputLabel>
          <Select
            labelId="price-select-label"
            value={sortPrice}
            label="Sort by Price"
            onChange={handleSortPriceChange}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="asc">Low to High</MenuItem>
            <MenuItem value="desc">High to Low</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="products-list">
        <Grid container spacing={3}>
          {sortedProducts.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card className="product-card">
                <img src="https://www.netmeds.com/images/product-v1/150x150/908000/sebamed_baby_protective_facial_cream_100ml_121408_0_1.jpg" alt={product.MedicineName} className="product-image" />
                <CardContent>
                  <Typography variant="h6">{product.MedicineName}</Typography>
                  <Typography variant="body2" color="textSecondary">{product.Manufacturer}</Typography>

                  {/* Display rating stars */}
                  <div className="product-rating">
                    {renderStars(product.Ratings)} 
                  </div>

                  {/* Display MRP with best price */}
                  <div className="price-section">
                    <Typography variant="body2" color="textSecondary" className="striked-price">₹ {product.MRP}</Typography>
                    <Typography variant="body1" color="primary" className="product-price">₹ {product.bestPrice}</Typography>
                  </div>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleAddToCart(product)}
                    className="add-to-cart-button"
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
