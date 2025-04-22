"use client";
import React, { useState } from "react";
import Link from "next/link";
import type { FormikProps } from "formik";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LoginService } from "@/Services/LoginService";
import ApiNames from "@/constants/ApiNames";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormValues {
  email: string;
  password: string;
}

const SignupSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Signin() {
  const router = useRouter();

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleClickShowPassword = () => setIsPasswordShown((show) => !show);
  const handleLogin = async (values: LoginFormValues) => {
    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await LoginService(ApiNames.login, {
        email: values.email,
        password: values.password,
      });

      if (typeof response.result === "object") {
        const userData = {
          ...response.result,
          role: response.result.role.toLowerCase() as "admin" | "alumni",
        };

        localStorage.setItem("profile", JSON.stringify(userData));
        localStorage.setItem("role", userData.role);
        localStorage.setItem("token", response.result.token);

        if (typeof window !== "undefined") {
          (window as any).authToken = response.result.token;
        }

        localStorage.setItem("userData", JSON.stringify(userData));

        router.push("/dashboard");
      } else {
        setErrorMsg(response.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error", error);

      let errorMessage = "An error occurred during login";

      if (error instanceof Error) {
        if (error.message.includes("Failed to fetch")) {
          errorMessage = "Something went wrong. Please try again later.";
        } else if (error.message.includes("Network Error")) {
          errorMessage = "Something went wrong. Please try again later.";
        } else {
          try {
            // Try to parse the error message as JSON
            const parsedError = JSON.parse(error.message);

            errorMessage = parsedError.result || errorMessage;
          } catch {
            // If parsing fails, use the error message directly
            errorMessage = error.message;
          }
        }
      }

      setErrorMsg(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        handleLogin(values);
      }}
    >
      {({ handleChange, handleBlur, values }) => (
        <Form>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2.5 block font-medium text-dark dark:text-white"
            >
              Email
            </label>
            <div className="relative">
              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>
            <ErrorMessage
              name="email"
              component="div"
              className="mt-1 text-sm text-red-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="mb-2.5 block font-medium text-dark dark:text-white"
            >
              Password
            </label>
            <div className="relative">
              <Field
                type={isPasswordShown ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
              <button
                type="button"
                onClick={handleClickShowPassword}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 focus:outline-none"
              >
                {isPasswordShown ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="mt-1 text-sm text-red-500"
            />
          </div>

          {/* Forget Password */}
          <div className="mb-6 flex items-center justify-between gap-2 py-2">
            <div></div>
            <Link
              href="/auth/forgetpassword"
              className="select-none font-satoshi text-base font-medium text-dark underline duration-300 hover:text-primary dark:text-white dark:hover:text-primary"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          {errorMsg && (
            <div className="mb-4 text-center text-sm font-medium text-red-600">
              {errorMsg}
            </div>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-3 font-semibold text-white"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
