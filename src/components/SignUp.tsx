"use client";
import React, { useState } from "react";
import { Formik, Form, Field as FormikField, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Eye,
  Mail,
  Phone,
  User,
  Briefcase,
  Building2,
  EyeOff,
} from "lucide-react";
import { SignUpService } from "@/Services/LoginService";
import ApiNames from "@/constants/ApiNames";
import { toast } from "react-toastify";

// Validation Schema using Yup
const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w\d!@#$%^&*]{8,12}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be 8-12 characters long",
    )
    .required("Password is required"),
  contact: Yup.string()
    .matches(/^[0-9]{10}$/, "Contact must be exactly 10 digits")
    .required("Contact is required"),
  company: Yup.string().required("Company is required"),
  position: Yup.string().required("Position is required"),
});

export default function SignUp() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePasswordVisibility = () => {
    setIsPasswordShown((prev) => !prev);
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        contact: "",
        name: "",
        company: "",
        position: "",
      }}
      validationSchema={SignUpSchema}
      onSubmit={async (values) => {
        console.log("Form Submitted:", values);

        try {
          const signUpData: any = {
            email: values.email,
            password: values.password,
            contact: Number(values.contact),
            name: values.name,
            company: values.company,
            position: values.position,
          };

          const response = await SignUpService(ApiNames.signup, signUpData);

          if (response.result === "success") {
            toast.success("Registration successful!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          } else {
            setError(response.result);
            toast.error(
              response.result || "Registration failed. Please try again.",
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              },
            );
          }
        } catch (error) {
          let errorMessage = "Registration failed. Please try again.";

          if (error instanceof Error) {
            if (error.message.includes("Failed to fetch")) {
              errorMessage = "Something went wrong. Please try again later.";
            } else if (error.message.includes("Network Error")) {
              errorMessage = "Something went wrong. Please try again later.";
            } else {
              errorMessage = error.message;
            }
          }
          setError(errorMessage);

          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } finally {
          setIsLoading(false);
        }
      }}
    >
      {({ handleChange, setFieldValue, values }) => (
        <Form className="mx-auto max-w-md space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-zinc-900">
          {/* Name */}
          <Field
            label="Name"
            name="name"
            value={values.name}
            placeholder="Enter your name"
            icon={<User size={18} />}
            onChange={handleChange}
          />

          {/* Email */}
          <Field
            label="Email"
            name="email"
            type="email"
            value={values.email}
            placeholder="Enter your email"
            icon={<Mail size={18} />}
            onChange={handleChange}
          />

          {/* Password */}
          <Field
            label="Password"
            name="password"
            type={isPasswordShown ? "text" : "password"}
            value={values.password}
            placeholder="Enter your password"
            icon={
              <div
                onClick={togglePasswordVisibility}
                className="cursor-pointer text-gray-400"
              >
                {isPasswordShown ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            }
            onChange={handleChange}
          />

          {/* Contact Number */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
              Contact Number
            </label>
            <div className="relative">
              <input
                type="text"
                name="contact"
                value={values.contact}
                maxLength={10}
                onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/\D/g, "");
                  setFieldValue("contact", onlyNumbers); // Sanitize input to only numbers
                }}
                placeholder="Enter contact number"
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Phone size={18} />
              </div>
            </div>
            <ErrorMessage
              name="contact"
              component="div"
              className="mt-1 text-sm text-red-500"
            />
          </div>

          {/* Company */}
          <Field
            label="Company"
            name="company"
            value={values.company}
            placeholder="Enter your company name"
            icon={<Building2 size={18} />}
            onChange={handleChange}
          />

          {/* Position */}
          <Field
            label="Position"
            name="position"
            value={values.position}
            placeholder="Enter your position"
            icon={<Briefcase size={18} />}
            onChange={handleChange}
          />

          <div style={{color:'red',textAlign:"center",fontWeight:'bold'}}>{error}</div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </Form>
      )}
    </Formik>
  );
}

// 📦 Field Component
const Field = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  icon?: React.ReactNode;
  type?: string;
}) => {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
        {label}
      </label>
      <div className="relative">
        <FormikField
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="mt-1 text-sm text-red-500"
      />
    </div>
  );
};
