import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserRepository } from './user.repository';
import { USER_MODAL, UserSchema } from './entities/user.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: USER_MODAL , schema: UserSchema }])],
  providers: [UserResolver, UserService, UserRepository],
  exports: [MongooseModule]
})
export class UserModule {}
