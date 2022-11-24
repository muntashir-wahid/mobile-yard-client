import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import FromCard from "../../components/Cards/FromCard";
import SecondaryHeading from "../../components/SectionHeadings/SecondaryHeading";
import FormWrapper from "../../components/Wrappers/FormWrapper";
import FormErrorMessage from "../../components/FormErrorMessage/FormErrorMessage";
import { AuthContext } from "../../context/AuthProvider";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import useSaveUser from "../../hooks/useSaveUser";

const Register = () => {
  // ------ //
  // Hooks
  // ------ //
  const [registrationError, setRegistrationError] = useState("");
  const [isRegistrationLoding, setIsRegistrationLoading] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUserHandler, updateUserHandler } = useContext(AuthContext);

  // Custome hooks
  const [savedUser] = useSaveUser(registeredUser);

  // ------------------- //
  // Form submit handler
  // ------------------- //
  const registerFormSubmitHandler = (data) => {
    const { displayName, email, password, accountType } = data;

    setRegistrationError("");
    setIsRegistrationLoading(true);
    createUserHandler(email, password)
      // Firebase registration
      .then(() => {
        updateUserHandler(displayName)
          // Update user in firebase
          .then(() => {
            const newUser = {
              name: displayName,
              email,
              accountType,
            };
            setRegisteredUser(newUser);
          })
          .catch((error) => {
            setRegistrationError(error.message);
          });
      })
      .catch((error) => {
        // Catch firebase registration error
        setRegistrationError(error.message);
      })
      .finally(() => {
        setIsRegistrationLoading(false);
      });
  };

  if (savedUser) {
    toast.success(
      `Congratulations ${savedUser.name}!You have created an account successfully!`
    );
    navigate("/");
  }

  if (isRegistrationLoding) {
    return (
      <Loader
        className="min-h-screen w-full"
        message="Please wait! Account is creating..."
      />
    );
  }

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
              {...register("accountType")}
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
        {registrationError && <FormErrorMessage message={registrationError} />}
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
