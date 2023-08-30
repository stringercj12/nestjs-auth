import { Controller, Post, Body, Get, Delete, Param, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  index() {
    return this.userService.all();
  }
  
  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id:string ) {
    return this.userService.removeById(id);
  }
}
