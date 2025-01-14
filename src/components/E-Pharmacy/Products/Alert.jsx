// import React from 'react'
// import "./SingleProduct.css"

// export default function Alert() {
//   return (
//     <>
//         <div className="alert alert-success alert-notification" role="alert">
//         <h4 className="alert-heading ">Added To Cart!</h4>
//         <hr/>
//         </div> 
//     </>
//   )
// }

import React from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';
import './SingleProduct.css'; // If you want to apply some custom styles to the alert

const Alert = () => {
  return (
    <BootstrapAlert variant="success" className="fixed-top alert-notification">
      Added to Cart!
    </BootstrapAlert>
  );
};

export default Alert;
