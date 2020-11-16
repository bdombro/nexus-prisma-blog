import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import TextFieldset from "../../../../molecules/TextFieldset";
import routeMeta from "./meta";

interface FormValues {
  email: string;
}

const Component: React.FC = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = React.useState(false);
  const { handleSubmit, register, errors } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    console.log(data);
    alert("Password Reset not implemented yet.");
    setSuccess(true);
  };

  if (success) {
    return (
      <>
        <h1>Success!</h1>
        <div>If that email matches a user, we'll send an email with instructions to reset your password.</div>
        <button onClick={() => navigate(-1)}>Go back to login?</button>
      </>
    );
  }

  return (
    <>
      <h1>{routeMeta.title}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextFieldset
          name="email"
          labelText="Email"
          type="email"
          autoFocus
          defaultValue="john@acme.com"
          placeholder="john@acme.com"
          error={errors?.email?.message}
          inputRef={register({
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => navigate(-1)}>Go back to login?</button>
    </>
  );
};

export default Component;
