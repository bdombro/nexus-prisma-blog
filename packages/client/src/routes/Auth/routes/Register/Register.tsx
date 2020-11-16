import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import CheckboxFieldset from "../../../../molecules/CheckboxFieldset";
import TextFieldset from "../../../../molecules/TextFieldset";
import { useAuthentication } from "../../../../state";
import { wait } from "../../../../util/wait";
import loginMeta from "../Login/meta";
import routeMeta from "./meta";

const Component: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state: authState, register } = useAuthentication();
  const { handleSubmit, register: registerField, errors, setError } = useForm<FormValues>();
  const qs = new URLSearchParams(location.search);
  let from = qs.get("from");
  // TODO: Figure out why we get redirected to ?from=undefined when going directly to /auth/register (same as login)
  if (from === "undefined") from = null;

  const onSubmit = React.useCallback(
    async (values: FormValues) => {
      const { terms, ...registerProps } = values;
      if (!terms) {
        setError("terms", { type: "manual", message: "You must accept the terms." });
        return;
      }
      const res = await register(registerProps);
      if (res.errors)
        res.errors.forEach((error) => {
          const field = /password/i.test(error.message) ? "password" : "email";
          setError(field, { type: "manual", message: error.message });
        });
      console.info("Register Success");
    },
    [register, setError]
  );

  React.useEffect(() => {
    if (authState.userId) wait(1000).then(() => (from ? navigate(-1) : navigate("/")));
  }, [authState.userId, from, navigate]);

  if (authState.userId) {
    return (
      <>
        <h1>Success!</h1>
        <div>You're logged in, sending you {from ? "back" : "home"}...</div>
      </>
    );
  }

  return (
    <>
      <h1>{routeMeta.title}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextFieldset
          name="name"
          labelText="Name"
          defaultValue="Jane Smith"
          error={errors?.name?.message}
          inputRef={registerField()}
        />
        <TextFieldset
          name="email"
          labelText="Email"
          type="email"
          autoFocus
          defaultValue="jane@acme.com"
          placeholder="janen@acme.com"
          error={errors?.email?.message}
          inputRef={registerField()}
        />
        <TextFieldset
          name="password"
          labelText="Password"
          type="password"
          placeholder="********"
          defaultValue="CoolPassword8"
          error={errors?.password?.message}
          inputRef={registerField()}
        />
        <CheckboxFieldset
          name="terms"
          labelText="Do you agree to these terms?"
          error={errors?.terms?.message}
          inputRef={registerField()}
        />
        <button type="submit">Submit</button>
      </form>
      <Link replace to={`${loginMeta.path}?${location.search}`}>
        Already have an account?
      </Link>
    </>
  );
};

export default Component;

export interface FormValues {
  email: string;
  password: string;
  name: string;
  terms: boolean;
}
