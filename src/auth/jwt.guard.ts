import { CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import * as jwt from 'jsonwebtoken';
import { UserService } from "src/user/user.service";

export class JwtGuard implements CanActivate {
    constructor(private readonly userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context).getContext();
        const authorizationHeader = ctx.req.headers.authorization;

        if (authorizationHeader && authorizationHeader.split(" ")[0] === "Bearer") {
            const token = authorizationHeader.split(" ")[1];

            try {
                const decoded: any = jwt.verify(token, process.env.JWT_TOKEN);
                const userId = decoded.user;

                if (!userId) {
                    throw new HttpException("Invalid token: ", HttpStatus.UNAUTHORIZED);
                }

                ctx.userId = userId;
                return true;
            } catch (error) {
                throw new HttpException("Invalid token: " + error.message, HttpStatus.UNAUTHORIZED);
            }
        }

        throw new HttpException("Authorization header not found", HttpStatus.UNAUTHORIZED);
    }
}
