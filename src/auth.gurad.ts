import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CustomAuthGuard extends AuthGuard('bearer')
{
  async canActivate(context: ExecutionContext): Promise<boolean>
  {
    if (context.getArgByIndex(0).route.path.match(/\/auth/)) {
      return true
    }
    return await super.canActivate(context) as boolean
  }

  handleRequest(err, user, info) {
    return super.handleRequest(err, user, info);
  }
}
