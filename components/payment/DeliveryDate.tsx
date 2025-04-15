import React from "react";
import Image from "next/image";
import { toJalaali } from "jalaali-js";
import { motion } from "framer-motion";
import { DeliveryTimeType } from "@/types";
import RadioButtonGroup from "../RadioButtonGroup";

interface PaymentDate {
  selectedOption: DeliveryTimeType;
  setSelectedOption: (item: DeliveryTimeType) => void;
  changeDeliveryTime: boolean;
  setChangeDeliveryTime: (item: boolean) => void;
}

const PaymentDate: React.FC<PaymentDate> = ({
  selectedOption,
  setSelectedOption,
  changeDeliveryTime,
  setChangeDeliveryTime,
}) => {
  const today = new Date();
  const { jy, jm, jd } = toJalaali(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );

  return (
    <div className="flex flex-col justify-start items-start gap-1 mt-4 p-4 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-700">
      <span className="text-gray-400 dark:text-gray-100">
        پونک - خیابان شهر
      </span>{" "}
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
                    setSelectedOption({
                      ...selectedOption,
                      day: item,
                    })
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
  );
};

export default React.memo(PaymentDate);
