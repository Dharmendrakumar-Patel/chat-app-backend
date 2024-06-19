import { Resolver, Mutation, Args} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupUserInput } from 'src/user/dto/signupUser.inupt';
import { LoginUserInput } from 'src/user/dto/loginUser.input';
import { UserOutPut } from 'src/user/dto/user.output';

@Resolver(() => UserOutPut)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserOutPut, { name: 'signUp', description: 'add new user into database' })
  signup(@Args('createUserInput') createUserInput: SignupUserInput) {
    return this.authService.signup(createUserInput);
  }

  @Mutation(() => UserOutPut, { name: 'login', description: 'login existing user' })
  login(@Args('login') loginInput: LoginUserInput) {
    return this.authService.login(loginInput)
  }

  @Mutation(() => String, { name: 'logout', description: 'logout from portal' })
  logout() {
    return this.authService.logout()
  } 
}
