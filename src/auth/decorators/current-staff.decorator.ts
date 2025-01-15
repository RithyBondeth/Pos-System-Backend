import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AUTH_MESSAGE } from "../auth.constant";
import { PayloadT } from "@app/common/jwt/jwt.service";

export const CurrentStaff = createParamDecorator((data: unknown, context: ExecutionContext): PayloadT => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if(!user) throw new UnauthorizedException(AUTH_MESSAGE.INVALID_TOKEN);

    return user;
});