import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { LoginInput } from 'src/user/dto/login.input';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  hashPassword = async (password: string) => {
    const saltOrRounds = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(password, saltOrRounds)
    return encryptedPassword
  }

  validatePassword = async (password, encryptedPassword) => {
    const decryptedPassword = await bcrypt.compare(password, encryptedPassword)
    return decryptedPassword
  }

  async signup(createUserInput: CreateUserInput) {
    const password = await this.hashPassword(createUserInput.password)
    return await this.authRepository.create({
        ...createUserInput,
        password,
    })
  }
  
  async login(loginInput: LoginInput) {
    const user = await this.authRepository.findOne({email: loginInput.email})

    if(!user) {
      throw new NotFoundException('Email Or Password Is Inorrect.')
    }

    if(!await this.validatePassword(loginInput.password, user.password)) {
      throw new NotFoundException('Email Or Password Is Inorrect.')
    }

    return user
  }
}
