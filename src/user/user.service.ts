import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  user = new Map()

  create(createUserInput: CreateUserInput) {
    const id = this.user.size
    this.user.set(id, { _id: id, ...createUserInput })
    return this.user.get(id)
  }

  findAll() {
    return Array.from(this.user.values());  
  }

  findOne(id: number) {
    return this.user.get(id)
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    this.user.set(id, { ...this.user.get(id), ...updateUserInput })
    return this.user.get(id)
  }

  remove(id: number) {
    return this.user.delete(id)
  }
}
