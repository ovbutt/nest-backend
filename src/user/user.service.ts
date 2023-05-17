import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { User } from './user.entitiy';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  // private users: User[] = []; // You can replace this with a proper database later

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const { firstName, lastName, username, password } = createUserDto;
    const newUser: User = this.userRepository.create({
      // id: Date.now().toString(),
      firstName,
      lastName,
      username,
      password,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }

  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { username, password },
    });
    if (!user) {
      throw new NotFoundException('Invalid username or password');
    }
    return user;
  }
}
