import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AbstractDocument } from 'src/database/abstract.entity';

@Schema({ timestamps: true, versionKey: false })
@ObjectType()
export class User extends AbstractDocument {
    @Prop({ required: true, })
    @Field({ description: 'user first name' })
    firstname: string;

    @Prop({ required: true })
    @Field({ description: 'user last name' })
    lastname: string;

    @Prop({ required: true, unique: true })
    @Field({ description: 'unique identification for authentication' })
    email: string;

    @Prop({ required: true })
    @Field({ description: 'password for validating user' })
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User);

export const USER_MODAL = User.name