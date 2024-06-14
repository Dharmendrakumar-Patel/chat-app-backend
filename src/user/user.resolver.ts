import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ObjectId } from 'mongoose';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users', description: 'returs all users data' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user', description: 'return single user data' })
  find(@Args('_id', { type: () => String }) id: ObjectId) {
    return this.userService.find(id);
  }

  @Mutation(() => User, { name: 'createUser', description: 'add new user into database' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User, { name: 'updateUser', description: 'updates exiting user' })
  updateUser(@Args('_id', { type: () => String }) id: ObjectId, @Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => User, { name: "deleteUser", description: 'deletes exiting user' })
  removeUser(@Args('_id', { type: () => String }) id: ObjectId) {
    return this.userService.remove(id);
  }
}
