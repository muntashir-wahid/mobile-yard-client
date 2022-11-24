import React from "react";
import { Link } from "react-router-dom";
import FromCard from "../../components/Cards/FromCard";
import SecondaryHeading from "../../components/SectionHeadings/SecondaryHeading";
import FormWrapper from "../../components/Wrappers/FormWrapper";

const Register = () => {
  return (
    <FormWrapper>
      <SecondaryHeading>Please Register</SecondaryHeading>
      <FromCard>
        <form className="mb-4">
          <div className="form-control w-full max-w-md mx-auto">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              placeholder="Your name..."
              className="input input-bordered w-full max-w-md"
            />
          </div>
          <div className="form-control w-full max-w-md mx-auto">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              placeholder="Your email..."
              className="input input-bordered w-full max-w-md"
            />
          </div>
          <div className="form-control w-full max-w-md mx-auto">
            <label className="label">
              <span className="label-text">Your Password</span>
            </label>
            <input
              type="password"
              placeholder="Your password..."
              className="input input-bordered w-full max-w-md"
            />
          </div>
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Account type</span>
            </label>
            <select defaultValue="user" className="select select-bordered">
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
