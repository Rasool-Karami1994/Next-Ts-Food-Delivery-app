import Link from "next/link";
import PaymentForm from "../../components/PaymentForm";
import { useStore } from "@/store";
import StickyBackButton from "@/components/StickyBackButton";
import { Fragment, useState } from "react";
import { motion } from "framer-motion";

const CheckoutPage: React.FC = () => {
  const finalFee = useStore((state) => state.finalFee);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [disableFinishButton, setDisableFinishButton] = useState<boolean>(true);

  const navigateToCheckout = () => {
    setShowModal(true);
  };

  return (
    <div className="mx-auto bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <StickyBackButton href="/cart" />
      {showModal ? (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full"
        >
          <div className=" mx-auto p-4 bg-white dark:bg-gray-900 min-h-screen px-4 lg:px-10 transition-colors duration-300">
            <div className="mx-auto w-[100%] md:w-[35%] bg-gray-200 dark:bg-gray-600 max-h-min border dark:border-gray-700 rounded-xl shadow-md py-[40px] px-4 flex flex-col justify-start items-center mt-20 gap-5">
              <svg
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-orange-400 dark:text-orange-500"
              >
                <circle
                  cx="256"
                  cy="256"
                  r="246"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="30"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="115.54 268.77 200.67 353.9 396.46 158.1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="30"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                پرداخت موفق
              </p>
              <p className="text-gray-400 dark:text-gray-200">
                عملیات پرداخت با موفقیت انجام شد
              </p>
              <Link
                href="/"
                className="flex h-[60px] w-full items-center justify-center gap-3 rounded-3xl bg-orange-400 dark:bg-orange-500 p-3 text-white duration-200 hover:bg-orange-500"
              >
                <span className="font-bold">خرید جدید</span>
              </Link>
            </div>
          </div>
        </motion.div>
      ) : (
        <Fragment>
          <PaymentForm setDisableFinishButton={setDisableFinishButton} />
          <div className="sticky bottom-0 z-50 py-3 px-4 flex justify-between items-center bg-white dark:bg-gray-800 border-t transition-colors duration-300">
            <div className="flex items-center justify-center gap-2 text-sm md:text-base text-slate-600 dark:text-gray-300">
              <span>مبلغ قابل پرداخت:</span>
              {finalFee ? (
                <span className="font-extrabold">
                  {Number(finalFee).toLocaleString()} تومان
                </span>
              ) : (
                0
              )}
            </div>
            <button
              onClick={navigateToCheckout}
              disabled={disableFinishButton}
              className="flex h-[50px] w-40 items-center justify-center gap-3 rounded-3xl bg-orange-400 dark:bg-orange-500 p-3 text-white duration-200 hover:bg-orange-500 disabled:bg-gray-100 disabled:text-gray-400"
            >
              <span className="font-bold">پرداخت</span>
            </button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default CheckoutPage;
