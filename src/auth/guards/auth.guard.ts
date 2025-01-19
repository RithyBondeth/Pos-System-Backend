import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AUTH_MESSAGE } from "../auth.constant";
import { JwtService, PayloadT } from "@app/common/jwt/jwt.service";
import { StaffService } from "src/staff/staff.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
        private readonly staffService: StaffService,
    ) {}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride("roles", [
            context.getHandler(),
            context.getClass(),
        ])

        if(requiredRoles?.length) {
            const request = context.switchToHttp().getRequest();
            const token = request.headers?.authorization?.split("Bearer ")[1];
            if(!token) throw new UnauthorizedException(AUTH_MESSAGE.INVALID_TOKEN);

            try {
                const payload: PayloadT = this.jwtService.decodeToken(token);
                const staff = await this.staffService.findOneById(payload.id);
                if(!staff) throw new UnauthorizedException(AUTH_MESSAGE.INVALID_CREDENTIALS);
                
                if(requiredRoles.includes(staff.role.name)) return true;

                throw new ForbiddenException(AUTH_MESSAGE.INSUFFICIENT);
            } catch(error) {
                console.error(error);
                throw new UnauthorizedException(
                    AUTH_MESSAGE.INSUFFICIENT + 
                    "(Only Manager or Administrator can access this resource)"
                );
            }
        }
    }   
}