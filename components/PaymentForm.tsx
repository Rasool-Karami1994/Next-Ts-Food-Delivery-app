import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { toJalaali } from "jalaali-js";
import RadioButtonGroup from "./RadioButtonGroup";
import { motion } from "framer-motion";

// تعریف نوع برای روش تحویل
type DeliveryMethod = "delivery" | "bySelf";

// مقادیری که فرم ارسال با پیک نیاز داره
interface DeliveryFormValues {
  customerName: string;
  province: string;
  city: string;
  fullAddress: string;
  postalCode: string;
  mobile: string;
}

const deliveryInitialValues: DeliveryFormValues = {
  customerName: "",
  province: "",
  city: "",
  fullAddress: "",
  postalCode: "",
  mobile: "",
};

const DeliveryValidationSchema = Yup.object({
  province: Yup.string().required("انتخاب استان الزامی است"),
  city: Yup.string().required("انتخاب شهر الزامی است"),
  fullAddress: Yup.string().required("وارد کردن آدرس کامل الزامی است"),
  postalCode: Yup.string()
    .matches(/^\d{10}$/, "کد پستی اشتباه است")
    .required("کد پستی الزامی است"),
  mobile: Yup.string()
    .matches(/^09\d{9}$/, "شماره موبایل اشتباه است")
    .required("شماره موبایل الزامی است"),
});

const citiesByProvince: { [key: string]: string[] } = {
  تهران: ["تهران", "ورامین", "تهران2"],
  شیراز: ["شیراز", "شیراز2", "شیراز3"],
  رشت: ["رشت", "لاهیجان", "رشت2"],
};

type makedTimeType = {
  time: string;
  day: string;
};

const PaymentPage: React.FC = () => {
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
    console.log("Delivery details submitted:", values);
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
   
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* کارت شیوه تحویل سفارش */}
        <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            روش تحویل سفارش
          </h2>
          {/* سوییچ دو دکمه‌ای */}
          <div className="flex items-center justify-center mb-2 w-full">
            <button
              onClick={() => setDeliveryMethod("bySelf")}
              className={`w-[50%] px-4 py-2 rounded-r-2xl border border-l-0 dark:border-gray-700 focus:outline-none ${
                deliveryMethod === "bySelf"
                  ? "bg-orange-400 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              تحویل حضوری
            </button>
            <button
              onClick={() => setDeliveryMethod("delivery")}
              className={`w-[50%] px-4 py-2 rounded-l-2xl border dark:border-gray-700 focus:outline-none ${
                deliveryMethod === "delivery"
                  ? "bg-orange-400 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              ارسال با پیک
            </button>
          </div>
          {/* چیپ پیشنهاد ویژه */}
          <div className="mt-2 inline-block bg-orange-100 dark:bg-yellow-500 text-gray-500 dark:text-gray-100 px-3 py-1 rounded-full text-sm">
            پیشنهاد ویژه: 10,000 تومان تخفیف برای تحویل حضوری
          </div>
          {/* نمایش بخش‌های مرتبط بر اساس انتخاب کاربر */}
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
            <div className="mt-4">
              <Formik
                initialValues={deliveryInitialValues}
                validationSchema={DeliveryValidationSchema}
                onSubmit={handleDeliverySubmit}
              >
                {({ values, setFieldValue, isSubmitting }) => (
                  <Form className="space-y-4">
                    {/* نام (اختیاری) */}
                    <div>
                      <label
                        htmlFor="customerName"
                        className="block mb-1 text-gray-700 dark:text-gray-300"
                      >
                        نام (اختیاری):
                      </label>
                      <Field
                        type="text"
                        name="customerName"
                        id="customerName"
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-xl text-sm p-3 bg-white dark:bg-gray-700 text-gray-400 dark:text-white focus:outline-none focus:border-orange-300"
                      />
                    </div>
                    {/* استان (الزامی) */}
                    <div>
                      <label
                        htmlFor="province"
                        className="block mb-1 text-gray-700 dark:text-gray-300"
                      >
                        استان:
                      </label>
                      <Field
                        as="select"
                        name="province"
                        id="province"
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-xl text-sm p-3 bg-white dark:bg-gray-700 text-gray-400 dark:text-white focus:outline-none focus:border-orange-300"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          setFieldValue("province", e.target.value);
                          setFieldValue("city", "");
                        }}
                      >
                        <option value=""></option>
                        <option value="تهران">تهران</option>
                        <option value="شیراز">شیراز</option>
                        <option value="رشت">رشت</option>
                      </Field>
                      <ErrorMessage
                        name="province"
                        component="div"
                        className="mt-1 text-red-500 text-sm"
                      />
                    </div>
                    {values.province ? (
                      <div>
                        <label
                          htmlFor="city"
                          className="block mb-1 text-gray-700 dark:text-gray-300"
                        >
                          شهر:
                        </label>
                        <Field
                          as="select"
                          name="city"
                          id="city"
                          disabled={!values.province}
                          className="w-full border border-gray-300 dark:border-gray-700 rounded-xl text-sm p-3 bg-white dark:bg-gray-700 text-gray-400 dark:text-white focus:outline-none focus:border-orange-300"
                        >
                          <option value=""> </option>
                          {values.province &&
                            citiesByProvince[values.province]?.map((city) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
                        </Field>
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="mt-1 text-red-500 text-sm"
                        />
                      </div>
                    ) : null}
                    {/* آدرس کامل (الزامی) */}
                    <div>
                      <label
                        htmlFor="fullAddress"
                        className="block mb-1 text-gray-700 dark:text-gray-300"
                      >
                        آدرس کامل:
                      </label>
                      <Field
                        type="text"
                        name="fullAddress"
                        id="fullAddress"
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-xl text-sm p-3 bg-white dark:bg-gray-700 text-gray-400 dark:text-white focus:outline-none focus:border-orange-300"
                      />
                      <ErrorMessage
                        name="fullAddress"
                        component="div"
                        className="mt-1 text-red-500 text-sm"
                      />
                    </div>
                    {/* کد پستی (الزامی) */}
                    <div>
                      <label
                        htmlFor="postalCode"
                        className="block mb-1 text-gray-700 dark:text-gray-300"
                      >
                        کد پستی:
                      </label>
                      <Field
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-xl text-sm p-3 bg-white dark:bg-gray-700 text-gray-400 dark:text-white focus:outline-none focus:border-orange-300"
                      />
                      <ErrorMessage
                        name="postalCode"
                        component="div"
                        className="mt-1 text-red-500 text-sm"
                      />
                    </div>
                    {/* شماره موبایل (الزامی) */}
                    <div>
                      <label
                        htmlFor="mobile"
                        className="block mb-1 text-gray-700 dark:text-gray-300"
                      >
                        شماره موبایل:
                      </label>
                      <Field
                        type="text"
                        name="mobile"
                        id="mobile"
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-xl text-sm p-3 bg-white dark:bg-gray-700 text-gray-400 dark:text-white focus:outline-none focus:border-orange-300"
                      />
                      <ErrorMessage
                        name="mobile"
                        component="div"
                        className="mt-1 text-red-500 text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 bg-orange-300 dark:bg-orange-400 hover:bg-orange-400 dark:hover:bg-orange-500 transition-colors text-white font-semibold rounded-xl shadow"
                    >
                      ثبت آدرس و ادامه پرداخت
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          )}
          {/* زمان تحویل */}
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
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    <p className="text-gray-600 dark:text-gray-200 text-sm duration-300">
                      {`${selectedOption?.day} ${selectedOption?.time}`}
                    </p>
                  </motion.div>
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
                        transition={{ duration: 1, delay: 0.5 }}
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

          {/* شیوه پرداخت */}
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

export default PaymentPage;
