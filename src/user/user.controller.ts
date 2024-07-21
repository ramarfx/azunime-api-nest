import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  LoginUserRequest,
  RegisterUserRequest,
  UserResponse,
} from '../model/user.model';
import { UserService } from './user.service';

@Controller('/auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/check')
  getUser() {
    return 'hello from user controller';
  }

  @Post('/register')
  async register(@Body() req: RegisterUserRequest): Promise<UserResponse> {
    try {
      const result = await this.userService.register(req);

      return result;
    } catch (error) {
      return error;
    }
  }

  @Post('/login')
  async login(@Body() req: LoginUserRequest): Promise<UserResponse> {
    try {
      const result = await this.userService.login(req);

    return result;
    } catch (error) {
      return error
    }
  }
}
