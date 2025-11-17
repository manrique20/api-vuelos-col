import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}
  getAllUsers() {
    return this.userRepository.find();
  }
  getUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
  async getLogin(loginUserDto: LoginUserDto) {
    const userFound = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });
    if (!userFound) {
      return new HttpException(
        {
          status: false,
          error: 'Usuario no encontrado',
          code: 404,
        },
        404,
      );
    }
    if (userFound.password !== loginUserDto.password) {
      return new HttpException(
        {
          status: false,
          error: 'Usuario o contraseña incorrecta',
          code: 401,
        },
        401,
      );
    }
    const loggedUser = await this.userRepository.findOne({
      where: { email: loginUserDto.email, password: loginUserDto.password },
    });
    return {
      status: true,
      data: loggedUser,
      message: 'Inicio de sesión exitoso',
      code: 100,
    };
  }
  async createUser(userObject: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: { email: userObject.email },
    });
    if (userFound) {
      return new HttpException(
        {
          status: false,
          error: 'Ya existe un usuario con ese correo electrónico',
          code: 400,
        },
        400,
      );
    }
    const newUser = this.userRepository.create({
      status: 'active',
      role: 'customer',
      ...userObject,
    } as any);
    return {
      data: await this.userRepository.save(newUser),
      status: true,
      code: 100,
      message: 'Usuario creado exitosamente',
    };
  }
}
