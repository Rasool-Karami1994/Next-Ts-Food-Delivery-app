import Link from "next/link";
import PaymentForm from "../../components/PaymentForm";
import { useRouter } from "next/router";

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { paymentValue } = router.query;
  console.log(paymentValue);
  return (
    <div className=" mx-auto bg-white dark:bg-gray-900 min-h-screen">
      <PaymentForm />
      <div className="sticky py-3 px-4 flex justify-between items-center bottom-0 z-50 bg-white dark:bg-gray-800 border-t">
        <div className="flex  items-center justify-center gap-2 text-sm md:text-base text-slate-600 dark:text-gray-300">
          <span>مبلغ قابل پرداخت:</span>
          {paymentValue ? (
            <span className="font-extrabold">
              {paymentValue?.toLocaleString()} تومان
            </span>
          ) : (
            0
          )}
        </div>
        <Link
          href="/checkout"
          className=" flex h-[50px] w-40 items-center justify-center gap-3 rounded-3xl bg-orange-400 p-3 text-white duration-200 hover:bg-orange-500"
        >
          <span className="font-bold">پرداخت</span>
        </Link>
      </div>
    </div>
  );
};

export default CheckoutPage;
