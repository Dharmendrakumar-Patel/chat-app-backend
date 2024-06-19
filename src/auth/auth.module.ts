import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthRepository } from './auth.repository';
import { UserModule } from 'src/user/user.module';
import { JwtGuard } from './jwt.guard';

@Module({
  imports: [UserModule],
  providers: [AuthResolver, AuthService, AuthRepository, JwtGuard],
  exports: []
})
export class AuthModule {}
