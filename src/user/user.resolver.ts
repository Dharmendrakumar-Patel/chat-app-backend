import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common/decorators';
import { UserService } from './user.service';
import { UpdateUserInput } from './dto/updateUser.input';
import { UserOutPut } from './dto/user.output';
import { JwtGuard } from 'src/auth/jwt.guard';
import { SignupUserInput } from './dto/signupUser.inupt';

@Resolver(() => UserOutPut)
@UseGuards(JwtGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserOutPut], { name: 'users', description: 'returs all users data' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => UserOutPut, { name: 'user', description: 'return single user data' })
  find(@Context('userId') userId: string) {
    return this.userService.find(userId);
  }

  @Mutation(() => UserOutPut, { name: 'createUser', description: 'add new user into database' })
  createUser(@Args('createUserInput') createUserInput: SignupUserInput) {
    return this.userService.create(createUserInput,);
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
