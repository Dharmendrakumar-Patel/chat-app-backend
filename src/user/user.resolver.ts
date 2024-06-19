import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UpdateUserInput } from './dto/updateUser.input';
import { UserOutPut } from './dto/user.output';

@Resolver(() => UserOutPut)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserOutPut], { name: 'users', description: 'returs all users data' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => UserOutPut, { name: 'user', description: 'return single user data' })
  find(@Args('_id') id: string) {
    return this.userService.find(id);
  }

  @Mutation(() => UserOutPut, { name: 'updateUser', description: 'updates exiting user' })
  updateUser(@Args('_id') id: string, @Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => String, { name: "deleteUser", description: 'deletes exiting user' })
  removeUser(@Args('_id') id: string) {
    return this.userService.remove(id);
  }
}
