import mongoose from 'mongoose';

interface ITimestamps {
  createdAt: Date;
  updateAt: Date;
}

type tDocument<Fields> = Fields & ITimestamps & mongoose.Document;
type tSchema<Fields> = {
  [K in keyof Fields]: mongoose.SchemaDefinitionProperty<Fields[K]>;
};

interface ITodoFields {
  text: string;
}

const todoSchema: tSchema<ITodoFields> = {
  text: String,
}

export default mongoose.model<tDocument<tSchema<ITodoFields>>>(
  'Todo',
  new mongoose.Schema(todoSchema, { timestamps: true })
);