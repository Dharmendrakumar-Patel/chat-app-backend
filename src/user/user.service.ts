import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UpdateUserInput } from './dto/update-user.input';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  hashPassword = async (password: string) => {
    const saltOrRounds = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(password, saltOrRounds)
    return encryptedPassword
  }

  async findAll() {
    return await this.userRepository.find({})
  }

  async find(_id: string){
    return await this.userRepository.findOne({_id})
  }

  async update(_id: string, updateUserInput: Partial<UpdateUserInput>) {
    return await this.userRepository.findOneAndUpdate(
      {_id}, 
      {
        ...updateUserInput,
        password: await this.hashPassword(updateUserInput.password)
      }
    )
  }

  async remove(_id: string) {
    return await this.userRepository.findOneAndDelete({_id})
  }
}
