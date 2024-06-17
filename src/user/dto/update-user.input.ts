import { Types } from 'mongoose';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends CreateUserInput {
    @Field(() => ID, { nullable: true })
    _id: Types.ObjectId;
}
