import { GraphQLError } from "graphql";

import { CreateUserInput } from "../../__generated__/globalTypes";
import { Token_token, TokenVariables } from "./__generated__/Token";

export interface AuthState {
  accessToken: string;
  userId: string;
  roles: string[];
}

export type LoginBody = TokenVariables;
export type LoginErrors = readonly GraphQLError[];
export interface LoginResponse {
  data?: Token_token;
  errors?: LoginErrors;
}

export type RegisterBody = CreateUserInput;
export type RegisterErrors = readonly GraphQLError[];
export interface RegisterResponse {
  data?: Token_token;
  errors?: RegisterErrors;
}

type Login = (creds: LoginBody) => Promise<LoginResponse>;
type Register = (creds: RegisterBody) => Promise<RegisterResponse>;
export type Logout = () => Promise<void>;

export type ContextType = {
  state: AuthState;
  login: Login;
  logout: Logout;
  register: Register;
};
