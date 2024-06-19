import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/database/abstract.entity';

@Schema({ timestamps: true, versionKey: false })
export class User extends AbstractDocument {
    @Prop({ required: true, })
    firstname: string;

    @Prop({ required: true })
    lastname: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User);

export const USER_MODAL = User.name