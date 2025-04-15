import React from "react";
import Image from "next/image";

interface PaymentMethod {
  paymentMethod: string;
  setPaymentMethod: (item: string) => void;
}

const PaymentMethod: React.FC<PaymentMethod> = ({
  paymentMethod,
  setPaymentMethod,
}) => {
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };
  return (
    <div className="flex flex-col justify-start items-start gap-3 mt-4 p-4 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-700">
      <div className="flex justify-start items-center gap-1">
        <div className="flex items-center">
          <input
            type="radio"
            id="bank"
            name="bank"
            value="bank"
            checked={paymentMethod === "bank"}
            onChange={handleOptionChange}
            className="h-4 w-4 text-orange-600 focus:ring-orange-500 cursor-pointer"
          />
          <label
            htmlFor="bank"
            className="mx-2 text-sm flex items-center gap-1 pr-1"
          >
            <Image
              className="h-[35px] max-h-[35px] border rounded-full p-1 ml-2 dark:bg-white"
              src="/images/credit-card-active.svg"
              height={35}
              width={35}
              alt={"bank-icon"}
            />
            <p className="text-gray-600 dark:text-gray-200 text-sm">
              پرداخت آنلاین (درگاه بانک)
            </p>
          </label>
        </div>
      </div>
      <div className="flex justify-start items-center gap-1">
        <div className="flex items-center">
          <input
            type="radio"
            id="bipa"
            name="bipa"
            value="bipa"
            checked={paymentMethod === "bipa"}
            onChange={handleOptionChange}
            className="h-4 w-4 text-orange-600 focus:ring-orange-500 cursor-pointer"
          />
          <label
            htmlFor="bipa"
            className="mx-2 text-sm flex items-center gap-1 pr-1"
          >
            <Image
              className="h-[35px] max-h-[35px] border rounded-full p-1 ml-2 dark:bg-white"
              src="/images/paybuy-1.svg"
              height={35}
              width={35}
              alt={"bipa-icon"}
            />
            <p className="text-gray-600 dark:text-gray-200 text-sm">
              پرداخت با بی پا
            </p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PaymentMethod);
