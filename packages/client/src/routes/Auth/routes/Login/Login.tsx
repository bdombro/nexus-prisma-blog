import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import TextFieldset from "../../../../molecules/TextFieldset";
import { useAuthentication } from "../../../../state/authentication";
import { wait } from "@app/util/dist/async";
import forgotMeta from "../ForgotPassword/meta";
import registerMeta from "../Register/meta";
import routeMeta from "./meta";

const Component: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state: authState, login } = useAuthentication();
  const { handleSubmit, register: registerField, errors, setError } = useForm<FormValues>();
  const qs = new URLSearchParams(location.search);
  let from = qs.get("from");
  if (from === "undefined") from = null;

  const onSubmit = React.useCallback(
    async (values: FormValues) => {
      const res = await login(values);
      if (res.message)
        setError('email', { type: "manual", message: res.message });
      else console.info("Login Success");
    },
    [login, setError]
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
          name="email"
          labelText="Email"
          type="text"
          autoFocus
          placeholder="stacey@acme.com"
          defaultValue="admin@example.com"
          error={errors?.email?.message}
          inputRef={registerField()}
        />
        <TextFieldset
          name="password"
          labelText="Password"
          type="password"
          placeholder="********"
          defaultValue="CoolPassword9"
          error={errors?.password?.message}
          inputRef={registerField()}
        />
        <button type="submit">Submit</button>
      </form>
      <Link replace to={`${registerMeta.path}?${location.search}`}>
        Need an account?
      </Link>
      <Link to={forgotMeta.path}>Forgot your password?</Link>
    </>
  );
};

export default Component;

export interface FormValues {
  email: string;
  password: string;
}
