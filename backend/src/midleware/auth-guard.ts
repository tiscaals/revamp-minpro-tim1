import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const token = req.headers.authorization;

    if (!token) {
      res.send('Access Denied!');
    }

    try {
      await jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      throw new UnauthorizedException({
        status: 401,
        message: 'token expired',
      });
    }
    return true;
  }
}