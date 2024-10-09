import mongoose, { Document, Schema} from "mongoose";
import bcrypt from "bcrypt";
import { IDepartment } from "./Department";

export interface IUser extends Document {
    userName: string,
    password: string,
    role: 'Employee' | 'Administrator',
    salary: number,
    yearsOfExperience: number,
    startDate: Date,
    age: number
    lastLogin: Date,
    department: IDepartment['_id'],
    comparePassword(userPassword: string): Promise<boolean>
}

const UserSchema = new Schema({
    userName : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: ['Employee', 'Administrator'],
        default: 'Employee'
    },
    salary:{
        type: Number,
        required: true,
        min: 0
    },
    yearsOfExperience:{
        type: Number,
        required: true
    },
    startDate:{
        type: Date,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    lastLogin: {
        type: Date
    },
    Department : {
        type: Schema.Types.ObjectId,
        ref: 'department'
    }
}, { timestamps: true});

UserSchema.pre<IUser>('save', async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
    return next();

})

UserSchema.methods.comparePassword = async function(userPassword: string): Promise<boolean> {
    return await bcrypt.compare(userPassword, this.password);
}

UserSchema.index({role:1})

export default mongoose.model<IUser>("User", UserSchema);