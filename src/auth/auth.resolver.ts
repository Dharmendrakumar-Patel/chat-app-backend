import { Resolver, Mutation, Args} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { LoginInput } from 'src/user/dto/login.input';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User, { name: 'signUp', description: 'add new user into database' })
  signup(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.signup(createUserInput);
  }

  @Mutation(() => User, { name: 'login', description: 'login existing user' })
  login(@Args('login') loginInput: LoginInput) {
    return this.authService.login(loginInput)
  }
}
