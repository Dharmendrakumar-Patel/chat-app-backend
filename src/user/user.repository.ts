import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '../database/abstract.repository';
import { USER_MODAL, User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// @Injectable() decorator is used to define a class as a provider.
@Injectable()
export class UserRepository extends AbstractRepository<User> {
  protected readonly logger = new Logger(UserRepository.name);

  // @InjectModel() decorator is used to inject a Mongoose model.
  constructor(@InjectModel(USER_MODAL) userModel: Model<User>) {
    // super() method is used to call the constructor of the extended class (AbstractRepository). So we can use the methods of the extended class in the UsersRepository class.
    super(userModel);
  }
}