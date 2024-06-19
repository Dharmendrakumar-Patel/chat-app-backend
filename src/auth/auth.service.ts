import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Injectable, NotFoundException } from '@nestjs/common';
import { SignupUserInput } from 'src/user/dto/signupUser.inupt';
import { LoginUserInput } from 'src/user/dto/loginUser.input';
import { AuthRepository } from './auth.repository';
import { Context } from '@nestjs/graphql';
import { Response } from 'express';

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

  async signup(createUserInput: SignupUserInput, @Context('res') res: Response) {
    const password = await this.hashPassword(createUserInput.password)
    const user = await this.authRepository.create({
        ...createUserInput,
        password,
    })

    const token = await jwt.sign({ user: user._id }, process.env.JWT_TOKEN, { expiresIn: '24h' })

    res.cookie('chatApp', token)

    return { ...user, token }
  }
  
  async login(loginInput: LoginUserInput, @Context('res') res: Response) {
    const user = await this.authRepository.findOne({email: loginInput.email})

    if(!user) {
      throw new NotFoundException('Email Or Password Is Inorrect.')
    }

    if(!await this.validatePassword(loginInput.password, user.password)) {
      throw new NotFoundException('Email Or Password Is Inorrect.')
    }

    const token = await jwt.sign({ user: user._id }, process.env.JWT_TOKEN, { expiresIn: '24h' })

    res.cookie('chatApp', token)

    return { ...user, token }
  }

  async logout(@Context('res') res: Response) {

    res.clearCookie('chatApp')

    return "logout successfully"
  }
}
