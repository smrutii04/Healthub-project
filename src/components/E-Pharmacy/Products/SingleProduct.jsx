import React, { useState } from "react";
import { useCart } from '../Cart/CartContext';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Rating, Divider } from "@mui/material";
import Alert from "./Alert"
import "./SingleProduct.css";

export default function SingleProduct({ product, openDialog, closeDialog }) {
  const { addToCart } = useCart();
  const [showAlert, setShowAlert] = useState(false);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
  };

  return (
    <>
     

      <Dialog
        open={openDialog}
        onClose={closeDialog}
        fullWidth
        maxWidth="md"
        className="product-dialog"
      >
        <DialogTitle className="dialog-title">
          <div className="dialog-title-content">
            <span>{product.name}</span>
            <button className="close-dialog" onClick={closeDialog}>
              ×
            </button>
          </div>
        </DialogTitle>

        <DialogContent className="dialog-content">
           {/* Bootstrap Alert Notification */}
      {showAlert && (
        <Alert />
      )}
          <div className="product-details-container">
            {/* Left Section: Product Image */}
            <div className="product-image-container">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
            </div>

            {/* Right Section: Product Details */}
            <div className="product-info">
              <p className="product-price">Price: {product.price}</p>
              <div className="product-rating">
                <Rating value={product.rating || 4.5} precision={0.5} readOnly />
                <span>({product.reviews || "0"} Reviews)</span>
              </div>
              <Divider style={{ margin: "10px 0" }} />
              <p className="product-description">{product.description}</p>

              <h4>Key Benefits</h4>
              <ul className="key-benefits-list">
                {product.keyBenefits?.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>

              <h4>How to Use</h4>
              <p>{product.howToUse}</p>

              <h4>Precautions</h4>
              <p>{product.precautions}</p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="additional-info">
            <h4>Ingredients</h4>
            <p>{product.ingredients}</p>

            <h4>Quantity</h4>
            <p>{product.quantity}</p>
          </div>
        </DialogContent>

        <DialogActions className="dialog-actions">
          <Button onClick={closeDialog} color="secondary">
            Close
          </Button>
          <Button
            onClick={() => handleAddToCart(product)}
            variant="contained"
            className="add-to-cart-button"
          >
            Add to Cart
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
