import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterUserRequest, UserResponse } from 'src/model/user.model';
import { UserService } from './user.service';

@Controller('/auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser() {
    return 'hello from user controller';
  }

  @Post('/register')
  async register(@Body() req: RegisterUserRequest): Promise<UserResponse> {
    const result = await this.userService.register(req);

    return result;
  }
}
