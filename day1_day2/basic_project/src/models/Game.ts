import mongoose, {Document, Schema} from "mongoose";

export interface IGame extends Document {
    title: string;
    genre: string;
    releaseDate: Date;
    price: number;
    publisher: string;
    tages: string[];
}

const gameSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    tages: {
        type: [{type:String}],
        required: true
    }
});

export default mongoose.model("Game", gameSchema);