import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { User } from '../entities/user.entity';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}
  async validate(email: any) {
    const emailResult = await this.userModel.findOne({ where: { email } });
    return emailResult ? false : true;
  }
}

export function IsEmailAlreadyUsed(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailConstraint,
    });
  };
}
