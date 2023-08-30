import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma } from '.prisma/client';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UnauthorizedError } from 'src/auth/errors/unauthorized.error';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await hash(createUserDto.password, 10),
    };

    const user = await this.prismaService.user.findUnique({
      where: {
        email: createUserDto.email
      }
    });

    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const createdUser = await this.prismaService.user.create({ data });

    console.log(createdUser)

    delete createUserDto.password;

    return createdUser;
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
      select: {
        password: false
      }
    });
  }

  all() {
    return this.prismaService.user.findMany();
  }

  async removeById(id: string) {

    const user = await this.prismaService.user.findUnique({
      where: {
        id
      }
    });

    if (!user) {
      throw new BadRequestException('Email not exists');
    }

  await this.prismaService.user.delete({
      where: {
        id
      }
    });


    return ''
  }
}
