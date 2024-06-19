import { Types } from 'mongoose';
import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
    @Field(() => ID, { nullable: true })
    _id: Types.ObjectId;

    @Field({ description: 'user first name', nullable: true })
    firstname: string
  
    @Field({ description: 'user last name', nullable: true })
    lastname: string
    
    @Field({ description: 'unique identification for authentication'})
    email: string
  
    @Field({ description: 'password for validating user'})
    password: string
}
