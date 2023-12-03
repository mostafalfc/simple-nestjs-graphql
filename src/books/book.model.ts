import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
})
export class Book extends Document {
  @Field()
  @Prop({ type: String, required: true })
  title: string;

  @Field()
  @Prop({ type: String, required: true })
  author: string;

  @Field()
  @Prop({ type: Date, required: true })
  publish_date: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
