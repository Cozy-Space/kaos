import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class LoginGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const session = context.switchToHttp().getRequest().session;
    return session?.user;
  }
}
