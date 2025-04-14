import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React from "react";
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
interface ClientInfoFormProps {
  handleDeliverySubmit: (values: DeliveryFormValues) => void;
}

const ClientInfoForm: React.FC<ClientInfoFormProps> = ({
  handleDeliverySubmit,
}) => {
  return (
    <div className="mt-4">
      <Formik
        initialValues={deliveryInitialValues}
        validationSchema={DeliveryValidationSchema}
        onSubmit={handleDeliverySubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-4">
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
  );
};
export default React.memo(ClientInfoForm);
