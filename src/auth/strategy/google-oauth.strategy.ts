import { Injectable } from "@nestjs/common";
import { Guards } from "src/@types/auth.guards";
import { Strategy } from "passport-google-oauth20";
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export default class GoogleOAuthStrategy extends PassportStrategy(
  Strategy,
  Guards.GOOGLE_OAUTH,
) {}
