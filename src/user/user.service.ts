import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    return await this.userRepository.find({})
  }

  async find(_id: string){
    return await this.userRepository.findOne({_id})
  }

  async create(createUserInput: CreateUserInput) {
    const {firstname, lastname, email, password} = createUserInput
    const saltOrRounds = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(password, saltOrRounds)

    return await this.userRepository.create({
        firstname,
        lastname,
        email,
        password: encryptedPassword,
    })
  }

  async update(_id: string, updateUserInput: Partial<UpdateUserInput>) {
    return await this.userRepository.findOneAndUpdate({_id}, updateUserInput)
  }

  async remove(_id: string) {
    return await this.userRepository.findOneAndDelete({_id})
  }
}
