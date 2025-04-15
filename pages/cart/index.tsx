import { useStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import StickyBackButton from "@/components/StickyBackButton";
import CartItems from "@/components/CartItems";
import { DiscountState } from "@/types";


const Cart: React.FC = () => {
  const cart = useStore((state) => state.cart);
  const setFinalFee = useStore((state) => state.setFinalFee);

  const [discount, setDiscount] = useState<DiscountState>({
    showInput: false,
    code: "",
    applied: false,
    error: "",
  });

  const discountAmount = discount?.applied ? 50000 : 0;

  const value = cart.reduce(
    (sum, item) =>
      item.quantity > 1 ? sum + item.price * item.quantity : sum + item.price,
    0
  );
  const deliveryFee = 35000;
  const finalValue = value + deliveryFee - discountAmount;

  const checkDiscountCode = () => {
    const discountRegex = /^discount$/i;
    if (discountRegex.test(discount?.code)) {
      setDiscount((prevState) => {
        return { ...prevState, showInput: false, applied: true, error: "" };
      });
    } else {
      setDiscount((prevState) => {
        return { ...prevState, error: "کد تخفیف وارد شده صحیح نیست!" };
      });
    }
  };

  const navigateToCheckout = () => {
    setFinalFee(`${finalValue}`);
  };

  return (
    <div className="mx-auto  bg-white dark:bg-gray-900 min-h-screen ">
      <StickyBackButton href="/" />
      {cart?.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-3 px-4 lg:px-10">
          <h2 className="justify-self-center font-extrabold text-2xl text-gray-600 dark:text-white md:col-span-2 md:justify-self-start lg:col-span-3">
            سبد خرید شما
          </h2>

          <div className="flex w-full flex-col items-center justify-start gap-7 lg:col-span-2">
            {cart?.map((item) => (
              <CartItems cartItem={item} key={item?.id} />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className="w-full"
          >
            <div className="flex w-full flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-md max-h-min border dark:border-gray-700">
              <div className="flex items-center justify-start gap-2 border-b border-stone-100 dark:border-gray-700 p-6">
                <span className="flex size-6 items-center justify-center">
                  <Image
                    src="/images/receipt-text.svg"
                    height={24}
                    width={24}
                    alt=""
                    className="size-full dark:bg-white dark:rounded-md"
                  />
                </span>
                <span className="text-xl font-bold text-slate-800 dark:text-white">
                  فاکتور شما
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-5 border-b border-dashed border-stone-100 dark:border-gray-700 p-6">
                <div className="flex w-full items-center justify-between font-bold text-slate-400">
                  <span>جمع سفارش:</span>
                  <span className="font-extrabold">
                    {value.toLocaleString()} تومان
                  </span>
                </div>
                <div className="flex w-full items-center justify-between font-bold text-slate-400">
                  <span>هزینه ارسال:</span>
                  <span className="font-extrabold">
                    {deliveryFee.toLocaleString()} تومان
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-5 border-b border-dashed border-stone-100 dark:border-gray-700 p-6">
                <div className="flex w-full items-center justify-between font-bold text-slate-600 dark:text-gray-300">
                  <span>مبلغ قابل پرداخت:</span>
                  <span className="font-extrabold">
                    {finalValue.toLocaleString()} تومان
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-end gap-3 px-6 pb-6 pt-2">
                {!discount?.applied && !discount?.showInput && (
                  <button
                    onClick={() =>
                      setDiscount((prevState) => {
                        return { ...prevState, showInput: true };
                      })
                    }
                    className="p-3 text-xs font-bold text-gray-400 dark:text-gray-200 duration-200 hover:scale-105"
                  >
                    کد تخفیف دارم!
                  </button>
                )}
                {discount?.showInput && !discount?.applied && (
                  <div className="flex w-full flex-col items-center gap-3">
                    <input
                      type="text"
                      value={discount?.code}
                      onChange={(e) => {
                        setDiscount((prevState) => {
                          return {
                            ...prevState,
                            error: "",
                            code: e.target.value,
                          };
                        });
                      }}
                      placeholder="کد تخفیف را وارد کنید (مقدار صحیح: discount)"
                      className={`w-full rounded-xl p-2 text-sm border ${
                        discount?.error
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-300 dark:border-gray-700"
                      } dark:bg-gray-700 dark:text-white`}
                    />
                    {discount?.error ? (
                      <span className="text-xs text-red-500">
                        {discount?.error}
                      </span>
                    ) : null}

                    <button
                      onClick={checkDiscountCode}
                      className="flex h-[60px] w-full items-center justify-center gap-3 rounded-3xl bg-gray-400 p-3 text-white duration-200 hover:bg-gray-500"
                    >
                      بررسی کد تخفیف
                    </button>
                  </div>
                )}
                {discount?.applied && !discount?.showInput ? (
                  <p className="p-3 text-xs font-bold text-gray-400 dark:text-gray-200 ">
                    کد تخفیف اعمال شد
                  </p>
                ) : null}

                <Link
                  href="/checkout"
                  onClick={navigateToCheckout}
                  className="flex h-[60px] w-full items-center justify-center gap-3 rounded-3xl bg-orange-400 p-3 text-white duration-200 hover:bg-orange-500"
                >
                  <span className="font-bold">پرداخت</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="w-full"
        >
          <div className="mx-auto p-4 bg-white dark:bg-gray-900 min-h-screen px-4 lg:px-10">
            <div className="mx-auto w-[70%] md:w-[30%] bg-gray-200 dark:bg-gray-600 max-h-min border rounded-xl shadow-md py-[40px] px-4 flex flex-col justify-start items-center mt-20 gap-10">
              <Image
                className="w-80 h-[80px] max-h-[80px] text-gray-800 dark:text-gray-200"
                src="/images/gray-empty.svg"
                height={40}
                width={40}
                alt="empty-cart"
              />
              <p className="text-gray-600 dark:text-gray-200">
                سبد خرید شما خالیه!
              </p>
              <Link
                href="/"
                className="flex h-[60px] w-full items-center justify-center gap-3 rounded-3xl bg-orange-400 p-3 text-white duration-200 hover:bg-orange-500"
              >
                <span className="font-bold">بریم خرید</span>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
