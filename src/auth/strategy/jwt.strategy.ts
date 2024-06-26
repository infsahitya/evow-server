import { ConfigType } from "@nestjs/config";
import authConfig from "src/config/auth.config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { GuardTokens } from "src/constant/guard.constant";

@Injectable()
export default class JwtStrategy extends PassportStrategy(
  Strategy,
  GuardTokens.JWT,
) {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authConfigService: ConfigType<typeof authConfig>,
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: authConfigService.jwt.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  validate(payload) {
    return payload;
  }
}
