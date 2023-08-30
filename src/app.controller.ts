import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { User } from './user/entities/user.entity';

@Controller()
export class AppController {
  constructor() {}

  @Get('/me')
  getMe(@CurrentUser() currentUser: User) {
    return currentUser;
  }
}