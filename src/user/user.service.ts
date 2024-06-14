import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { USER_MODAL, UserDocument } from './entities/user.schema';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER_MODAL) private userModel: Model<UserDocument>) {}

  user = new Map()

  async findAll() {
    return await this.userModel.find() 
  }

  async find(id: ObjectId){
    return await this.userModel.findById(id)
  }

  async create(createUserInput: CreateUserInput) {
    const {firstname, lastname, email, password} = createUserInput
    const saltOrRounds = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(password, saltOrRounds)

    console.log(password, encryptedPassword)

    const user = await this.userModel.create({
        firstname,
        lastname,
        email,
        password: encryptedPassword,
    })

    return user
  }


  async update(id: ObjectId, updateUserInput: UpdateUserInput) {
    const exitingUser = await this.userModel.findById(id)

    if(!exitingUser) throw Error("User Not Exits")

    const user = await this.userModel.findByIdAndUpdate(id, updateUserInput, {new: true})

    return user
  }

  async remove(id: ObjectId) {
    const exitingUser = await this.userModel.findById(id)

    if(!exitingUser) throw Error("User Not Exits")

    await this.userModel.findByIdAndDelete(id)

    return { message: id }
  }
}
