import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import FromCard from "../../components/Cards/FromCard";
import SecondaryHeading from "../../components/SectionHeadings/SecondaryHeading";
import FormWrapper from "../../components/Wrappers/FormWrapper";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../../components/FormErrorMessage/FormErrorMessage";
import { AuthContext } from "../../context/AuthProvider";
import Loader from "../../components/Loader/Loader";
import useGetAccessToken from "../../hooks/useGetAccessToken";

const Login = () => {
  // ------ //
  // Hooks
  // ------ //
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { logInUserHandler, logInWithGoogleHandler } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [userLogingLoding, setUserLogingLoading] = useState(false);
  const [loggedInUserEmail, setLoddedInUserEmail] = useState("");
  const [token] = useGetAccessToken(loggedInUserEmail, true);

  const navigate = useNavigate();

  if (token) {
    navigate("/");
  }

  // ------------------- //
  // Form submit handler
  // ------------------- //
  const loginFormSubmitHandler = (data) => {
    const { email, password } = data;
    setLoginError("");
    setUserLogingLoading(true);
    logInUserHandler(email, password)
      .then(({ user }) => {
        setLoddedInUserEmail(user?.email);
      })
      .catch((error) => {
        setLoginError(error.message);
      })
      .finally(() => {
        setUserLogingLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    console.log(logInWithGoogleHandler);
  };

  if (userLogingLoding) {
    return <Loader className="min-h-screen" message="Please wait!Loging..." />;
  }

  return (
    <FormWrapper>
      <SecondaryHeading>Please Login</SecondaryHeading>
      <FromCard>
        <form onSubmit={handleSubmit(loginFormSubmitHandler)} className="mb-4">
          <div className="form-control w-full max-w-xs mx-auto">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              {...register("email", {
                required: "Email is required",
              })}
              type="email"
              placeholder="Your email..."
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="w-full max-w-xs mx-auto">
            {errors?.email && (
              <FormErrorMessage message={errors?.email?.message} />
            )}
          </div>
          <div className="form-control w-full max-w-xs mx-auto">
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
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="w-full max-w-xs mx-auto">
            {errors?.password?.type && (
              <FormErrorMessage message={errors?.password?.message} />
            )}
          </div>

          <div className="max-w-xs mx-auto mt-4">
            {loginError && <FormErrorMessage message={loginError} />}
          </div>
          <div className="form-control w-full max-w-xs mx-auto mt-6">
            <input type="submit" className="btn btn-primary" value="Login" />
          </div>
        </form>
        <div className="w-full max-w-xs mx-auto">
          <p className="text-center">
            New to <em className="font-medium">MobileYard</em>?{" "}
            <Link className="btn btn-link p-0" to="/register">
              Register
            </Link>
          </p>
          <div className="divider">OR</div>
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-primary btn-outline w-full mt-2"
          >
            <FcGoogle className="mr-1 text-lg" />
            Signin With Google
          </button>
        </div>
      </FromCard>
    </FormWrapper>
  );
};

export default Login;
