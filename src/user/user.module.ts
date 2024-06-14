import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { USER_MODAL, UserSchema } from './entities/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: USER_MODAL , schema: UserSchema }])],
  providers: [UserResolver, UserService],
  exports: [MongooseModule]
})
export class UserModule {}
