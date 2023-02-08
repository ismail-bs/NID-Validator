import { createParamDecorator, ExecutionContext } from '@nestjs/common';
/**
 * @return only the user from jwt payload
 */
export const User = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    return await context.switchToHttp().getRequest().user;
  },
);
