import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractDocument } from 'src/database/abstract.entity';

@ObjectType()
export class UserOutPut extends AbstractDocument {
    @Field({ description: 'user first name' })
    firstname: string;

    @Field({ description: 'user last name' })
    lastname: string;

    @Field({ description: 'unique identification for authentication' })
    email: string;

    @Field({ description: 'password for validating user' })
    password: string

    @Field({ description: 'JWT token', nullable: true })
    token: string
}