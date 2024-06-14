import { InputType, ID, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field({ description: 'user first name' })
  firstname: string

  @Field({ description: 'user last name' })
  lastname: string

  @Field({ description: 'unique identification for authentication' })
  email: string

  @Field({ description: 'password for validating user' })
  password: string
}
