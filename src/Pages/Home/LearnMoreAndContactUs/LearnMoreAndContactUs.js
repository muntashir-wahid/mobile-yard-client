import React from "react";
import SecondaryHeading from "../../../components/SectionHeadings/SecondaryHeading";
import SectionWrapper from "../../../components/Wrappers/SectionWrapper";

const LearnMoreAndContactUs = () => {
  return (
    <SectionWrapper className="p-4 md:px-12 py-12">
      <div className="mb-5 max-w-4xl mx-auto">
        <SecondaryHeading className="mb-4">
          Learn more and Contact us
        </SecondaryHeading>
        <p className="text-center mb-4">
          MobileYard is a good place for both second-hand phone buyers and
          sellers. On this site, you can create either a seller's account or a
          user's account. We ensure you with some best deals. Enjoy shopping!
        </p>
        <h5 className="text-lg font-semibold text-center mb-6">
          For more Information
        </h5>
        <div className="form-control w-full max-w-md  mb-4 mx-auto">
          <input
            type="email"
            placeholder="Your email"
            className="input input-bordered input-primary w-full max-w-md"
          />
        </div>
        <div className="form-control w-full max-w-md mx-auto mb-4">
          <textarea
            className="textarea textarea-primary w-full max-w-md"
            placeholder="Your message"
          ></textarea>
        </div>
        <div className="form-control w-full max-w-md mx-auto mb-4">
          <button className="btn btn-secondary btn-outline">Send</button>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LearnMoreAndContactUs;
