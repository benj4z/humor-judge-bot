import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Participant } from './group.dto';

export type GroupDocument = Group & Document;

@Schema()
export class Group {
  @Prop()
  name: string;

  @Prop({ default: [] })
  participants: Participant[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
