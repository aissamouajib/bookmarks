import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    if (context.getType() === 'http') {
      const req = context.switchToHttp().getRequest();
      if (data) {
        return req.user[data];
      }
      return req.user;
    }
  },
);
