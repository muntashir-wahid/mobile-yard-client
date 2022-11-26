import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FormErrorMessage from "../../../../components/FormErrorMessage/FormErrorMessage";
import Loader from "../../../../components/Loader/Loader";
import SecondaryHeading from "../../../../components/SectionHeadings/SecondaryHeading";
import { AuthContext } from "../../../../context/AuthProvider";

const AddAPhone = () => {
  const [isPhonePosting, setIsPhonePosting] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, data } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch("http://localhost:5000/api/v1/brands").then((res) => res.json()),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addPhoneFormSubmitHandler = (data) => {
    const extraInfo = {
      postTime: new Date().getTime(),
      state: "available",
      isAdvertised: false,
    };

    const formData = new FormData();
    const image = data.image[0];

    formData.append("image", image);

    setIsPhonePosting(true);

    fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMAGEBB_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          const phone = { ...data, ...extraInfo };
          phone.image = imageData?.data?.url;
          fetch("http://localhost:5000/api/v1/phones", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(phone),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data?.success) {
                setIsPhonePosting(false);
                toast.success(
                  `You have posted ${data?.data?.phone?.phoneName}`
                );
                navigate("/dashboard/my-phones");
              }
            });
        }
      });
  };

  if (isPhonePosting) {
    return <Loader className="min-h-screen" />;
  }

  return (
    <div className="px-4 my-10">
      <SecondaryHeading className="mt-8">Add a phone to Sell</SecondaryHeading>

      <form onSubmit={handleSubmit(addPhoneFormSubmitHandler)}>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Your Name</span>
          </label>
          <input
            {...register("sellerName", { required: "Name is required" })}
            type="text"
            placeholder="Muntashir Wahid"
            className="input input-bordered w-full max-w-md"
          />
          {errors?.sellerName && (
            <FormErrorMessage message={errors?.sellerName?.message} />
          )}
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Your Email</span>
          </label>
          <input
            {...register("sellerEmail")}
            type="text"
            defaultValue={user?.email}
            readOnly
            disabled
            className="input input-bordered w-full max-w-md"
          />
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Your Loaction</span>
          </label>
          <input
            {...register("sellerLocation", {
              required: "Location is required",
            })}
            type="text"
            placeholder="Dhaka"
            className="input input-bordered w-full max-w-md"
          />
          {errors?.sellerLocation && (
            <FormErrorMessage message={errors?.sellerLocation?.message} />
          )}
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Your Mobile No</span>
          </label>
          <input
            {...register("sellerContact", {
              required: "Mobile number is required",
            })}
            type="tel"
            placeholder="017********"
            className="input input-bordered w-full max-w-md"
          />
          {errors?.sellerContact && (
            <FormErrorMessage message={errors?.sellerContact?.message} />
          )}
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Phone Name or Modal</span>
          </label>
          <input
            {...register("phoneName", {
              required: "Phone name or modal is required",
            })}
            type="text"
            placeholder="iPhone 12"
            className="input input-bordered w-full max-w-md"
          />
          {errors?.phoneName && (
            <FormErrorMessage message={errors?.phoneName?.message} />
          )}
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Phone Original Price</span>
          </label>
          <input
            {...register("originalPrice", {
              required: "Phone Original Price is required",
            })}
            type="number"
            placeholder="999"
            className="input input-bordered w-full max-w-md"
          />
          {errors?.originalPrice && (
            <FormErrorMessage message={errors?.originalPrice?.message} />
          )}
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Phone Reselling price</span>
          </label>
          <input
            {...register("resellingPrice", {
              required: "Phone Reselling price is required",
            })}
            type="number"
            placeholder="500"
            className="input input-bordered w-full max-w-md"
          />
          {errors?.resellingPrice && (
            <FormErrorMessage message={errors?.resellingPrice?.message} />
          )}
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Years of use</span>
          </label>
          <input
            {...register("usedYears", {
              required: "Years of use is required",
            })}
            type="number"
            placeholder="1"
            className="input input-bordered w-full max-w-md"
          />
          {errors?.usedYears && (
            <FormErrorMessage message={errors?.usedYears?.message} />
          )}
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Phone condition</span>
          </label>
          <select
            {...register("phoneCondition")}
            defaultValue="Fair"
            className="select select-bordered w-full max-w-md"
          >
            <option value="Fair">Fair</option>
            <option value="Good">Good</option>
            <option value="Excellent">Excellent</option>
          </select>
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Your Phone Brand</span>
          </label>
          <select
            {...register("phoneBrand", {
              required: "Phone brand is required",
            })}
            className="select select-bordered w-full max-w-md"
          >
            {!isLoading &&
              data?.data?.availableBrands?.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
          </select>
          {errors?.phoneBrand && (
            <FormErrorMessage message={errors?.phoneBrand?.message} />
          )}
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Pick an image of the Phone</span>
          </label>
          <input
            {...register("image", { required: "Image is required" })}
            type="file"
            className="file-input file-input-bordered w-full max-w-md"
          />
          {errors?.image && (
            <FormErrorMessage message={errors?.image?.message} />
          )}
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text">Some Description</span>
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="textarea textarea-bordered h-24"
            placeholder="Some description"
          ></textarea>
          {errors?.description && (
            <FormErrorMessage message={errors?.description?.message} />
          )}
        </div>
        <input
          type="submit"
          className="btn btn-primary mt-4"
          value="Add Phone"
        />
      </form>
    </div>
  );
};

export default AddAPhone;
