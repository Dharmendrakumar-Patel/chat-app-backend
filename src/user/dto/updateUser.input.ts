import { Types } from 'mongoose';
import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
    @Field(() => ID, { nullable: true })
    _id: Types.ObjectId;

    @Field({ description: 'user first name', nullable: true })
    firstname: string
  
    @Field({ description: 'user last name', nullable: true })
    lastname: string
  
    @Field({ description: 'unique identification for authentication', nullable: true })
    email: string
  
    @Field({ description: 'password for validating user', nullable: true })
    password: string
}
