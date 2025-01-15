import { JwtService } from "@app/common/jwt/jwt.service";
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";

@Injectable()
export class CurrentStaffInterceptor implements NestInterceptor {
    constructor(private readonly jwtService: JwtService) {}
    async intercept(context: ExecutionContext, handler: CallHandler) {
        const request = context.switchToHttp().getRequest();
        const token = request?.headers?.authorization?.split("Bearer ")[1];
    
        if(token) {
            const user = this.jwtService.decodeToken(token);
            request.user = user;
        }
               
        return handler.handle();
    }
}