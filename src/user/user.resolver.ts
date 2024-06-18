import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users', description: 'returs all users data' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user', description: 'return single user data' })
  find(@Args('_id') id: string) {
    return this.userService.find(id);
  }

  @Mutation(() => User, { name: 'updateUser', description: 'updates exiting user' })
  updateUser(@Args('_id') id: string, @Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => User, { name: "deleteUser", description: 'deletes exiting user' })
  removeUser(@Args('_id') id: string) {
    return this.userService.remove(id);
  }
}
