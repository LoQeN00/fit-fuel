import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

type Inputs = {
  gender: string;
  age: string;
  weight: string;
  goal: string;
  products: string;
  activity: string;
};

const DietForm = () => {
  const useOpenApi = api.example.getResponseFromOpenAi.useMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    useOpenApi.mutate(formData);
    void router.push("/diet");
  };

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      className=" rounded-xl bg-gray-100 p-[50px] shadow-2xl"
    >
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Gender</span>
        </label>
        <select className="select-bordered select" {...register("gender")}>
          <option disabled selected>
            Pick one
          </option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Age</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input-bordered input w-full max-w-xs"
          maxLength={3}
          {...register("age")}
        />
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Weight (kg)</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input-bordered input w-full max-w-xs"
          {...register("weight")}
        />
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Goal</span>
        </label>
        <select className="select-bordered select" {...register("goal")}>
          <option disabled selected>
            Pick one
          </option>
          <option>Lose weight</option>
          <option>Maintain your weight</option>
          <option>Meet Zyzz</option>
          <option>Gain weight</option>
        </select>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">
            What products would you like to have in your diet ?
          </span>
        </label>
        <textarea
          className="textarea-bordered textarea h-24"
          placeholder="Type here"
          {...register("products")}
        ></textarea>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Activity</span>
        </label>
        <select className="select-bordered select" {...register("activity")}>
          <option disabled selected>
            Pick one
          </option>
          <option>
            Light activity (activity - about 140 minutes per week)
          </option>
          <option>
            Average activity (activity - about 280 minutes per week).
          </option>
          <option>High activity (activity - about 420 minutes per week)</option>
          <option>
            Very high physical activity (activity - about 560 minutes per week)
          </option>
        </select>
      </div>

      <button className="btn-neutral btn mt-5">Submit</button>

      {useOpenApi.error ? (
        <p className="mt-5 text-red-500">
          Something went wrong try again later
        </p>
      ) : null}
    </form>
  );
};

export default DietForm;
