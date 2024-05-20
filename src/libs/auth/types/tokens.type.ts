import { JwtPayload } from "./jwtPayload.type";

export type Tokens = {
  access_token: string,
  payload: JwtPayload
};
