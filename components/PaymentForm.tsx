// components/PaymentForm.tsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface PaymentFormValues {
  fullName: string;
  address: string;
  phone: string;
  cardNumber: string;
  expiryDate: string;
  cvv2: string;
}

const PaymentSchema = Yup.object().shape({
  fullName: Yup.string().required("وارد کردن نام الزامی است"),
  address: Yup.string().required("وارد کردن آدرس الزامی است"),
  phone: Yup.string().required("وارد کردن شماره تلفن الزامی است"),
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, "شماره کارت باید ۱۶ رقمی باشد")
    .required("وارد کردن شماره کارت الزامی است"),
  expiryDate: Yup.string().required("وارد کردن تاریخ انقضا الزامی است"),
  cvv: Yup.string()
    .matches(/^\d{4}$/, "CVV2 باید ۴ رقم باشد")
    .required("وارد کردن CVV2 الزامی است"),
});

const PaymentForm: React.FC = () => {
  const initialValues: PaymentFormValues = {
    fullName: "",
    address: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv2: "",
  };

  const handleSubmit = (values: PaymentFormValues) => {
    console.log("اطلاعات فرم پرداخت:", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={PaymentSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="fullName">نام کامل:</label>
            <Field
              type="text"
              name="fullName"
              id="fullName"
              className="border rounded p-1 w-full"
            />
            <ErrorMessage
              name="fullName"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="address">آدرس:</label>
            <Field
              type="text"
              name="address"
              id="address"
              className="border rounded p-1 w-full"
            />
            <ErrorMessage
              name="address"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="phone">شماره تلفن:</label>
            <Field
              type="text"
              name="phone"
              id="phone"
              className="border rounded p-1 w-full"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="cardNumber">شماره کارت:</label>
            <Field
              type="text"
              name="cardNumber"
              id="cardNumber"
              className="border rounded p-1 w-full"
            />
            <ErrorMessage
              name="cardNumber"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="expiryDate">تاریخ انقضا:</label>
            <Field
              type="text"
              name="expiryDate"
              id="expiryDate"
              placeholder="MM/YY"
              className="border rounded p-1 w-full"
            />
            <ErrorMessage
              name="expiryDate"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="cvv">CVV:</label>
            <Field
              type="text"
              name="cvv"
              id="cvv"
              className="border rounded p-1 w-full"
            />
            <ErrorMessage
              name="cvv"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white p-2 rounded"
          >
            پرداخت
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PaymentForm;
