import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { toJalaali } from "jalaali-js";
import RadioButtonGroup from "./RadioButtonGroup";
import { motion } from "framer-motion";
import ClientInfoForm from "./ClientInfoForm";

type DeliveryMethod = "delivery" | "bySelf";

interface DeliveryFormValues {
  customerName: string;
  province: string;
  city: string;
  fullAddress: string;
  postalCode: string;
  mobile: string;
}

type makedTimeType = {
  time: string;
  day: string;
};
type PaymentPage = {
  setDisableFinishButton: (item: boolean) => void;
};

const PaymentPage: React.FC<PaymentPage> = ({ setDisableFinishButton }) => {
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("delivery");
  const [changeDeliveryTime, setChangeDeliveryTime] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("bank");
  const [selectedOption, setSelectedOption] = useState<makedTimeType>({
    time: "",
    day: "",
  });
  const [address, setAddress] = useState<string>("");

  const handleDeliverySubmit = (values: DeliveryFormValues) => {
    setAddress(values?.fullAddress);
  };

  const today = new Date();
  const { jy, jm, jd } = toJalaali(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleDeliveryMethod = useCallback((value: DeliveryMethod) => {
    setDeliveryMethod(value);
  }, []);
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
                <span className="text-gray-400 dark:text-gray-100">
                  {address}
                </span>
              </p>
            </div>
          ) : (
            <ClientInfoForm handleDeliverySubmit={handleDeliverySubmit} />
          )}
          <p className="mt-4 text-gray-800 dark:text-white">زمان تحویل</p>
          <div className="flex flex-col justify-start items-start gap-1 mt-4 p-4 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-700">
            <span className="text-gray-400 dark:text-gray-100">
              پونک - خیابان شهر
            </span>
            <div className="flex justify-between items-center w-full">
              <div className="flex justify-start items-center gap-1">
                <Image
                  className="h-[35px] max-h-[35px] border rounded-full p-1 ml-2 dark:bg-white"
                  src="/images/clock.svg"
                  height={35}
                  width={35}
                  alt={"time-icon"}
                />
                {selectedOption?.time ? (
                  <p className="text-gray-600 dark:text-gray-200 text-sm duration-200">
                    {`${selectedOption?.day} ${selectedOption?.time}`}
                  </p>
                ) : (
                  <p className="text-gray-600 dark:text-gray-200 text-sm">
                    سریع‌ترین زمان ممکن - تا 30 دقیقه
                  </p>
                )}
              </div>
              {!changeDeliveryTime && !selectedOption?.time ? (
                <button
                  onClick={() => setChangeDeliveryTime(!changeDeliveryTime)}
                  className="flex justify-start items-center gap-1 cursor-pointer"
                >
                  <p className="text-gray-600 dark:text-gray-200 text-sm">
                    تغییر زمان
                  </p>
                  <Image
                    className="h-[25px] max-h-[25px]"
                    src="/images/chevron-l.svg"
                    height={25}
                    width={25}
                    alt={"change-time-icon"}
                  />
                </button>
              ) : null}
            </div>
            <div className="w-full flex flex-col justify-start gap-4 items-center">
              {changeDeliveryTime && !selectedOption?.time ? (
                <div className="w-full flex justify-center gap-4 items-center my-3  dark:text-white">
                  {["امروز", "فردا"].map((item, index) => {
                    return (
                      <motion.div
                        key={index}
                        onClick={() =>
                          setSelectedOption((prevState) => ({
                            ...prevState,
                            day: item,
                          }))
                        }
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                        className={`w-full flex flex-col justify-start gap-4 items-center rounded-lg p-8 border bg-white dark:bg-gray-600 cursor-pointer ${
                          selectedOption?.day === item
                            ? "border-gray-500 dark:border-white"
                            : "border dark:border-gray-700"
                        }`}
                      >
                        <button>
                          <span>{item}</span>{" "}
                          {index === 0
                            ? `${jy}/${jm}/${jd}`
                            : `${jy}/${jm}/${jd + 1}`}
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              ) : null}
              {selectedOption?.day && !selectedOption?.time ? (
                <div className="w-full flex justify-center gap-4 items-center my-3">
                  <RadioButtonGroup
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                  />
                </div>
              ) : null}
            </div>
          </div>

          <p className="mt-4 text-gray-800 dark:text-white">شیوه پرداخت</p>
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
        </div>
      </div>
    </div>
  );
};

export default React.memo(PaymentPage);
