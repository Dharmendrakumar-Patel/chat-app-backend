import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(type => ID,{ description: 'user id genrated from server', nullable: true })
  _id: string

  @Field({ description: 'user first name' })
  firstname: string

  @Field({ description: 'user last name' })
  lastname: string

  @Field({ description: 'unique identification for authentication' })
  email: string

  @Field({ description: 'password for validating user' })
  password: string
}
