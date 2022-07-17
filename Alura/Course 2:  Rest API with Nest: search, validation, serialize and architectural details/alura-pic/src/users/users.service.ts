import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async findOne(id: number): Promise<User> {
    const result = await this.userModel.findByPk(id);
    if (!result) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const updateResult = await this.userModel.update(updateUserDto, {
      where: { id },
    });
    if (updateResult[0] === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return await this.userModel.findByPk(id);
  }

  async remove(id: number): Promise<void> {
    const deleteResult = await this.userModel.destroy({ where: { id } });
    if (deleteResult === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
