import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema()
export class Group {
  @Prop()
  name: string;

  @Prop({ default: [] })
  participants: [];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
