import React, { useState } from 'react';
import './BestSellers.css';
import SingleProduct from '../Products/SingleProduct';

const bestSellers = [
    {
      id: 1,
      name: "Dolo 650 Table 15's",
      price: "₹ 30.38",
      image: "https://www.netmeds.com/images/product-v1/150x150/45296/dolo_650_tablet_15s_35281_0_3.jpg",
      rating: 4.5,
      reviews: 120,
      description: "Dolo 650 is a trusted brand for fever and mild to moderate pain relief.",
      keyBenefits: ["Reduces fever", "Relieves mild to moderate pain", "Suitable for adults and children"],
      howToUse: "Take one tablet every 4-6 hours as needed. Do not exceed 4 tablets in a day.",
      precautions: "Do not take on an empty stomach. Consult a doctor if symptoms persist.",
      ingredients: "Paracetamol 650mg",
      quantity: "15 tablets",
    },
    {
        id: 2,
        name: "SEBAMED BABY PROTECTIVE FACIAL Cream 100ml",
        price: "₹ 1,486.30",
        image: "https://www.netmeds.com/images/product-v1/150x150/908000/sebamed_baby_protective_facial_cream_100ml_121408_0_1.jpg",
        rating: 4.8,
        reviews: 85,
        description: "Sebamed Baby Protective Facial Cream is designed to provide intense hydration for delicate baby skin while protecting it from environmental aggressors.",
        keyBenefits: [
          "Moisturizes baby’s skin deeply",
          "Soothes irritated and dry skin",
          "Dermatologically tested for sensitive skin"
        ],
        howToUse: "Apply a small amount of cream gently on the baby's face after cleaning and drying. Use daily for best results.",
        precautions: "Avoid contact with eyes. For external use only. Keep out of reach of children.",
        ingredients: "Aqua, Paraffinum Liquidum, Allantoin, Glycerin, Panthenol, Vitamin E.",
        quantity: "100ml"
      }
      ,
      {
        id: 3,
        name: "COQ 300mg Softgel 15's",
        price: "₹ 4.99",
        image: "https://www.netmeds.com/images/product-v1/150x150/409597/coq_300mg_softgel_15_s_0.jpg",
        rating: 4.2,
        reviews: 68,
        description: "COQ 300mg Softgel Capsules provide a rich source of Coenzyme Q10, an antioxidant that supports heart health and energy production.",
        keyBenefits: [
          "Promotes cardiovascular health",
          "Boosts cellular energy production",
          "Acts as a powerful antioxidant"
        ],
        howToUse: "Take one softgel daily after meals or as directed by a healthcare professional.",
        precautions: "Consult your doctor before use if you are pregnant, nursing, or have a medical condition.",
        ingredients: "Coenzyme Q10 (300mg), Gelatin, Glycerin.",
        quantity: "15 Softgels"
      }
      ,
      {
        id: 4,
        name: "Benadryl Cough Formula Syrup 150ml",
        price: "₹ 139.50",
        image: "https://www.netmeds.com/images/product-v1/150x150/13778/benadryl_cough_formula_syrup_150ml_32458_0_1.jpg",
        rating: 4.5,
        reviews: 102,
        description: "Benadryl Cough Formula provides effective relief from dry and irritating coughs with its soothing formula.",
        keyBenefits: [
          "Relieves dry cough",
          "Soothes throat irritation",
          "Non-drowsy formula"
        ],
        howToUse: "Take 10ml every 4-6 hours as needed or as directed by a physician. Do not exceed the recommended dosage.",
        precautions: "Not suitable for children below 6 years. Consult a doctor if symptoms persist.",
        ingredients: "Diphenhydramine HCl, Ammonium Chloride, Sodium Citrate.",
        quantity: "150ml"
      }
      ,
      {
        id: 5,
        name: "Omnigel Gel (Topical) 75gm",
        price: "₹ 167.70",
        image: "https://www.netmeds.com/images/product-v1/150x150/412720/omnigel_geltopical_75gm_54223_0_3.jpg",
        rating: 4.7,
        reviews: 92,
        description: "Omnigel Gel is a topical analgesic that provides quick relief from muscle and joint pain, swelling, and inflammation.",
        keyBenefits: [
          "Effective relief from joint and muscle pain",
          "Reduces swelling and inflammation",
          "Quick absorption and fast action"
        ],
        howToUse: "Apply a small amount of gel on the affected area and massage gently. Use 3-4 times daily or as directed by a doctor.",
        precautions: "Do not apply on open wounds or broken skin. For external use only.",
        ingredients: "Diclofenac Diethylamine, Linseed Oil, Methyl Salicylate, Menthol.",
        quantity: "75gm"
      }
      ,
];

export default function BestSellers() {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
  
    const openProductDialog = (product) => {
      setSelectedProduct(product);
      setOpenDialog(true);
    };
  
    const closeDialog = () => {
      setOpenDialog(false);
    };
  
    return (
      <div className="best-sellers-container">
        <h2 className="best-sellers-title">Best Sellers Medicines</h2>
        <div className="best-sellers-grid">
          {bestSellers.map(medicine => (
            <div className="best-seller-box" key={medicine.id} onClick={() => openProductDialog(medicine)}>
              <img src={medicine.image} alt={medicine.name} className="best-seller-image" />
              <div className="best-seller-info">
                <p className="best-seller-name">{medicine.name}</p>
                <p className="best-seller-price">{medicine.price}</p>
              </div>
            </div>
          ))}
        </div>
      <div className="discover-more-container">
        <button
          className="discover-more-button"
          onClick={() => alert("Redirect to Discover More Page")}
        >
          Discover More Medicines
        </button>
      </div>
  
        {selectedProduct && (
          <SingleProduct
            product={selectedProduct}
            openDialog={openDialog}
            closeDialog={closeDialog}
          />
        )}
      </div>
    );
  }
