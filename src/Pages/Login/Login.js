import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import FromCard from "../../components/Cards/FromCard";
import SecondaryHeading from "../../components/SectionHeadings/SecondaryHeading";
import FormWrapper from "../../components/Wrappers/FormWrapper";

const Login = () => {
  return (
    <FormWrapper>
      <SecondaryHeading>Please Login</SecondaryHeading>
      <FromCard>
        <form className="mb-4">
          <div className="form-control w-full max-w-xs mx-auto">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              placeholder="Your email..."
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs mx-auto">
            <label className="label">
              <span className="label-text">Your Password</span>
            </label>
            <input
              type="password"
              placeholder="Your password..."
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          {/* <div className="max-w-xs mx-auto mt-4">
          <p className="text-right btn btn-link">Forget Password</p>
        </div> */}
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
          <button className="btn btn-primary btn-outline w-full mt-2">
            <FcGoogle className="mr-1 text-lg" />
            Signin With Google
          </button>
        </div>
      </FromCard>
    </FormWrapper>
  );
};

export default Login;
