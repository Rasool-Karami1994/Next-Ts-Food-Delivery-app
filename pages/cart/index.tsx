import { useStore } from "@/store";
import Image from "next/image";
import Link from "next/link";

const Cart: React.FC = () => {
  const cart = useStore((state) => state.cart);
  const addToCart = useStore((state) => state.addToCart);
  const removeFromCart = useStore((state) => state.removeFromCart);

  const value = cart.reduce(
    (sum, item) =>
      item.quantity > 1 ? sum + item.price * item.quantity : sum + item.price,
    0
  );
  const deliveryFee = 35000;
  const finalValue = value + deliveryFee;

  if (cart?.length > 0) {
    return (
      <div className="mx-auto p-4 bg-white dark:bg-gray-900 min-h-screen px-4 lg:px-10">
        <div className="mt-10 grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-3">
          <h2 className="justify-self-center font-extrabold text-2xl text-gray-600 dark:text-white md:col-span-2 md:justify-self-start lg:col-span-3">
            سبد خرید شما
          </h2>

          <div className="flex w-full flex-col items-center justify-start gap-7 lg:col-span-2">
            {cart?.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex w-full items-center justify-between gap-3 rounded-3xl bg-white dark:bg-gray-800 p-4 shadow-md border dark:border-gray-700"
                >
                  <div className="grid w-full grid-cols-[repeat(2,auto)] ">
                    <div className="row-span-2 max-w-32 overflow-hidden rounded-xl border dark:border-gray-700">
                      <Image
                        className="w-full h-[70px] max-h-[70px] object-cover"
                        src={item.image}
                        height={70}
                        width={70}
                        alt={item.title}
                      />
                    </div>
                    <div className="flex flex-col justify-around justify-self-end font-bold">
                      <h3 className="text-nowra col-span-2 text-xl text-gray-500 dark:text-gray-300 mb-1">
                        {item.title}
                      </h3>
                    </div>
                    <div className="flex flex-col items-end justify-center lg:self-stretch">
                      <div className="flex items-center justify-start gap-3">
                        <div className="flex flex-col items-start">
                          <div className="flex items-end justify-center gap-1">
                            <span className="text-gray-400 dark:text-gray-200 text-sm">
                              {item.price.toLocaleString()}{" "}
                            </span>
                            <span className="text-gray-400 dark:text-gray-200 text-sm">
                              تومان
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() => addToCart(item)}
                            className="rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-500 text-gray-400 dark:text-white p-0.5"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 5v14m-7-7h14"
                              />
                            </svg>
                          </button>
                          <div className="rounded-xl px-1.5 text-sm text-gray-400 dark:text-white">
                            {item.quantity}
                          </div>
                          <button
                            onClick={() => removeFromCart(item)}
                            className="rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-500 text-gray-400 dark:text-white p-0.5"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 12H5"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex w-full flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-md max-h-min border dark:border-gray-700">
            <div className="flex items-center justify-start gap-2 border-b border-stone-100 dark:border-gray-700 p-6">
              <span className="flex size-6 items-center justify-center">
                <Image
                  src="/images/receipt-text.svg"
                  height={24}
                  width={24}
                  alt=""
                  className="size-full"
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
            <div className="flex h-fit flex-col items-center justify-end gap-3 px-6 pb-6 pt-2">
              <button className="p-3 text-xs font-bold text-gray-400 dark:text-gray-200 duration-200 hover:text-blue-500">
                کد تخفیف دارم!
              </button>
              <Link
                href="/checkout"
                className="flex h-[60px] w-full items-center justify-center gap-3 rounded-3xl bg-orange-400 p-3 text-white duration-200 hover:bg-orange-500"
              >
                <span className="font-bold">پرداخت</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
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
            href={"/"}
            className="flex h-[60px] w-full items-center justify-center gap-3 rounded-3xl bg-orange-400 p-3 text-white duration-200 hover:bg-orange-500"
          >
            <span className="font-bold">بریم خرید</span>
          </Link>
        </div>
      </div>
    );
  }
};

export default Cart;
