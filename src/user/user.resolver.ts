import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users', description: 'returs all users data' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user', description: 'return single user data' })
  findOne(@Args('_id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User, { name: 'createUser', description: 'add new user into database' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User, { name: 'updateUser', description: 'updates exiting user' })
  updateUser(@Args('_id', { type: () => Int }) id: number, @Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => User, { name: "deleteUser", description: 'deletes exiting user' })
  removeUser(@Args('_id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
