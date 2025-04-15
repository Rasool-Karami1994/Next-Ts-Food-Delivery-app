import React, { Fragment, useCallback } from "react";
import Image from "next/image";
import { DeliveryFormValues, DeliveryMethod } from "@/types";
import ClientInfoForm from "../ClientInfoForm";

interface PaymentMethod {
  setDeliveryMethod: (item: DeliveryMethod) => void;
  deliveryMethod: DeliveryMethod;
  address: string;
  setAddress: (item: string) => void;
}

const PaymentMethod: React.FC<PaymentMethod> = ({
  deliveryMethod,
  setDeliveryMethod,
  address,
  setAddress,
}) => {
  const handleDeliverySubmit = (values: DeliveryFormValues) => {
    setAddress(values?.fullAddress);
  };

  const handleDeliveryMethod = useCallback((value: DeliveryMethod) => {
    setDeliveryMethod(value);
  }, []);

  return (
    <Fragment>
      <div className="flex items-center justify-center mb-2 w-full">
        <button
          onClick={() => handleDeliveryMethod("bySelf")}
          className={`w-[50%] px-4 py-2 rounded-r-2xl border border-l-0 dark:border-gray-700 focus:outline-none ${
            deliveryMethod === "bySelf"
              ? "bg-orange-400 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
        >
          تحویل حضوری
        </button>
        <button
          onClick={() => handleDeliveryMethod("delivery")}
          className={`w-[50%] px-4 py-2 rounded-l-2xl border dark:border-gray-700 focus:outline-none ${
            deliveryMethod === "delivery"
              ? "bg-orange-400 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
        >
          ارسال با پیک
        </button>
      </div>
      <div className="mt-2 inline-block bg-orange-100 dark:bg-yellow-500 text-gray-500 dark:text-gray-100 px-3 py-1 rounded-full text-sm">
        پیشنهاد ویژه: 10,000 تومان تخفیف برای تحویل حضوری
      </div>
      {deliveryMethod === "bySelf" ? (
        <div className="flex justify-start items-center gap-1 mt-4 p-4 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-700">
          <Image
            className="h-[35px] max-h-[35px] border rounded-full p-1 ml-2 dark:bg-white"
            src="/images/collection.svg"
            height={35}
            width={35}
            alt={"byself-icon"}
          />
          <p className="text-gray-600 dark:text-gray-200 text-sm">
            تحویل از شعبه:{" "}
            <span className="text-gray-400 dark:text-gray-100">
              پونک - خیابان شهر
            </span>
          </p>
        </div>
      ) : address ? (
        <div className="flex justify-start items-center gap-1 mt-4 p-4 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-700">
          <Image
            className="h-[35px] max-h-[35px] border rounded-full p-1 ml-2"
            src="/images/collection.svg"
            height={35}
            width={35}
            alt={"byself-icon"}
          />
          <p className="text-gray-600 dark:text-gray-200 text-sm">
            ارسال به :{" "}
            <span className="text-gray-400 dark:text-gray-100">{address}</span>
          </p>
        </div>
      ) : (
        <ClientInfoForm handleDeliverySubmit={handleDeliverySubmit} />
      )}
    </Fragment>
  );
};

export default React.memo(PaymentMethod);
