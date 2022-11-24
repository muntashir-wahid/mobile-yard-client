import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import FromCard from "../../components/Cards/FromCard";
import SecondaryHeading from "../../components/SectionHeadings/SecondaryHeading";
import FormWrapper from "../../components/Wrappers/FormWrapper";
import FormErrorMessage from "../../components/FormErrorMessage/FormErrorMessage";

const Register = () => {
  // ------ //
  // Hooks
  // ------ //
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ------------------- //
  // Form submit handler
  // ------------------- //
  const registerFormSubmitHandler = (data) => {
    console.log(data);
  };

  return (
    <FormWrapper>
      <SecondaryHeading>Please Register</SecondaryHeading>
      <FromCard>
        <form
          onSubmit={handleSubmit(registerFormSubmitHandler)}
          className="mb-4"
        >
          <div className="form-control w-full max-w-md mx-auto">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              {...register("displayName", {
                required: "Name is required",
              })}
              type="text"
              placeholder="Your name..."
              className="input input-bordered w-full max-w-md"
            />
          </div>
          {errors?.displayName && (
            <FormErrorMessage message={errors?.displayName?.message} />
          )}
          <div className="form-control w-full max-w-md mx-auto">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              {...register("email", {
                required: "Email address is required",
              })}
              type="email"
              placeholder="Your email..."
              className="input input-bordered w-full max-w-md"
            />
          </div>
          {errors?.email && (
            <FormErrorMessage message={errors?.email?.message} />
          )}
          <div className="form-control w-full max-w-md mx-auto">
            <label className="label">
              <span className="label-text">Your Password</span>
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password should be more then 6 charecters",
                },
              })}
              type="password"
              placeholder="Your password..."
              className="input input-bordered w-full max-w-md"
            />
          </div>
          {errors?.password?.type && (
            <FormErrorMessage message={errors?.password?.message} />
          )}
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Account type</span>
            </label>
            <select
              {...register("accounType")}
              defaultValue="user"
              className="select select-bordered"
            >
              <option value="user">User Account</option>
              <option value="seller">Seller Account</option>
            </select>
          </div>
          <div className="form-control w-full max-w-md mx-auto mt-6">
            <input type="submit" className="btn btn-primary" value="Register" />
          </div>
        </form>
        <div className="w-full max-w-md mx-auto">
          <p className="text-center">
            Already have an account?{" "}
            <Link className="btn btn-link p-0" to="/login">
              Login
            </Link>
          </p>
        </div>
      </FromCard>
    </FormWrapper>
  );
};

export default Register;
