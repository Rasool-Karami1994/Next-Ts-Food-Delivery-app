import React, { useEffect, useState } from "react";
import { DeliveryMethod, DeliveryTimeType } from "@/types";
import DeliveryDate from "./payment/DeliveryDate";
import DeliveryMethodComponent from "./payment/DeliveryMethodComponent";
import PaymentMethod from "./payment/PaymentMethod";

type PaymentPage = {
  setDisableFinishButton: (item: boolean) => void;
};

const PaymentPage: React.FC<PaymentPage> = ({ setDisableFinishButton }) => {
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("delivery");
  const [changeDeliveryTime, setChangeDeliveryTime] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("bank");
  const [selectedOption, setSelectedOption] = useState<DeliveryTimeType>({
    time: "",
    day: "",
  });
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    if (
      selectedOption?.time &&
      selectedOption?.day &&
      (address || deliveryMethod === "bySelf")
    ) {
      setDisableFinishButton(false);
    }
  }, [selectedOption, address, deliveryMethod]);
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            روش تحویل سفارش
          </h2>
          <DeliveryMethodComponent
            deliveryMethod={deliveryMethod}
            setDeliveryMethod={setDeliveryMethod}
            address={address}
            setAddress={setAddress}
          />{" "}
          <p className="mt-4 text-gray-800 dark:text-white">زمان تحویل</p>
          <DeliveryDate
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            changeDeliveryTime={changeDeliveryTime}
            setChangeDeliveryTime={setChangeDeliveryTime}
          />
          <p className="mt-4 text-gray-800 dark:text-white">شیوه پرداخت</p>
          <PaymentMethod
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(PaymentPage);
