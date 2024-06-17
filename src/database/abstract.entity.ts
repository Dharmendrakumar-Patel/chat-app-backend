import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Schema, Prop } from "@nestjs/mongoose"
import { SchemaTypes, Types } from "mongoose"

@Schema({ timestamps: true })
@ObjectType()
export class AbstractDocument {
    @Field(type => ID,{ description: 'user id genrated from server', nullable: true })
    @Prop({ type: SchemaTypes.ObjectId })
    _id: Types.ObjectId
}

