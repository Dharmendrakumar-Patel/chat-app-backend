import { Resolver, Mutation, Args, Context} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupUserInput } from 'src/user/dto/signupUser.inupt';
import { LoginUserInput } from 'src/user/dto/loginUser.input';
import { UserOutPut } from 'src/user/dto/user.output';
import { Response } from 'express'

@Resolver(() => UserOutPut)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserOutPut, { name: 'signUp', description: 'add new user into database' })
  signup(@Args('createUserInput') createUserInput: SignupUserInput,@Context('res') res: Response) {
    return this.authService.signup(createUserInput, res);
  }

  @Mutation(() => UserOutPut, { name: 'login', description: 'login existing user' })
  login(@Args('login') loginInput: LoginUserInput, @Context('res') res: Response) {
    return this.authService.login(loginInput, res)
  }

  @Mutation(() => String, { name: 'logout', description: 'logout from portal' })
  logout(@Context('res') res: Response) {
    return this.authService.logout(res)
  } 
}
