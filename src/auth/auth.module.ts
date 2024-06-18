import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthRepository } from './auth.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_MODAL, UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: USER_MODAL , schema: UserSchema }])],
  providers: [AuthResolver, AuthService, AuthRepository],
  exports: [MongooseModule]
})
export class AuthModule {}
