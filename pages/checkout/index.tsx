
import React from "react";
import PaymentForm from "../../components/PaymentForm";

const CheckoutPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">پرداخت</h1>
      <PaymentForm />
    </div>
  );
};

export default CheckoutPage;
