import { InputType, Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class SignupUserInput  {
  @Field(() => ID, { nullable: true })
  _id: Types.ObjectId;

  @Field({ description: 'user first name' })
  firstname: string

  @Field({ description: 'user last name' })
  lastname: string

  @Field({ description: 'unique identification for authentication' })
  email: string

  @Field({ description: 'password for validating user' })
  password: string
}
