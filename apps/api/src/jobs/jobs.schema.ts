import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApplicationStatus } from '@job-tracker/types';

@Schema()
export class Note {
  @Prop({ required: true })
  body!: string;

  @Prop({ default: Date.now })
  createdAt!: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true, // include virtual properties when serialising
    transform: (_doc, ret: Record<string, unknown>) => {
      delete ret._id; // remove _id
      delete ret.__v; // remove Mongoose version key
    },
  },
})
export class Job {
  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  company!: string;

  @Prop({ required: true })
  role!: string;

  @Prop()
  url?: string;

  @Prop({ required: true })
  status!: ApplicationStatus;

  @Prop({ type: [String], default: [] })
  tags?: string[];

  @Prop()
  appliedAt?: Date;

  @Prop({ type: [NoteSchema], default: [] })
  notes?: Note[];
}

export type JobDocument = HydratedDocument<Job>;

export const JobSchema = SchemaFactory.createForClass(Job);
