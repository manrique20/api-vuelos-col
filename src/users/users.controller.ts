import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './user.entity';
import { LoginUserDto } from './dto/login-user.dto';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.getAllUsers();
  }
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<Users | null> {
    return this.usersService.getUserById(id);
  }

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.getLogin(loginUserDto);
  }
}
