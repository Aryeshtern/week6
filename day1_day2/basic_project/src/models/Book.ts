import mongoose, {Document, Schema} from "mongoose";

export interface IUser extends Document {
    userName: string;
    email: string;
    password: string;
}

const bookSchema: Schema = new Schema({
    title: {type: String, required: true, unique: true},
});

export default mongoose.model("books", bookSchema);