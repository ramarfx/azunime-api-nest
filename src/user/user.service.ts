import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import {
  LoginUserRequest,
  RegisterUserRequest,
  UserResponse,
} from 'src/model/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async register(request: RegisterUserRequest): Promise<UserResponse> {
    const usernameWithSameName = await this.prismaService.user.count({
      where: {
        name: request.name,
      },
    });

    if (usernameWithSameName != 0) {
      throw new HttpException('username already exist', 400);
    }

    const registerUserPassword = await bcrypt.hash(request.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        name: request.name,
        email: request.email,
        password: registerUserPassword,
      },
    });
    const token = await bcrypt.hash(user.name, 10);

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: token,
      },
    });

    return {
      name: user.name,
      email: user.email,
      token: token,
    };
  }

  async login(request: LoginUserRequest): Promise<UserResponse> {
    const user = await this.prismaService.user.findUnique({
      where: {
        name: request.name,
      },
    });

    if (!user) {
      throw new HttpException('name or password invalid', 422);
    }

    const isPasswordValid = await bcrypt.compare(
      request.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('name or password invalid', 422);
    }

    const token = await this.prismaService.user.update({
      where: {
        id: user.id
      },
      data: {
        token: await bcrypt.hash(user.name, 10)
      }
    })

    return {
      name: user.name,
      email: user.email,
      token: token.token
    }
  }
}
