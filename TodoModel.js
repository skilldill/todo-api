import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    userKey: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        maxlength: 255,
        required: true,
    },
    description: {
        type: String,
        maxlength: 255,
        default: "",
    },
    status: {
        type: String,
        enum: ["new", "in progress", "done"],
        default: "new"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    versionKey: false,
    toJSON: {
        virtuals: true,
        transform: (_, ret) => {
            ret.id = ret._id;
            ret.createdAt = ret.createdAt.toISOString().split('T')[0];
            ret.updatedAt = ret.updatedAt.toISOString().split('T')[0];
            delete ret._id;
            delete ret.__v;
            delete ret.userKey;
            return ret;
        }
    } 
});

export const TodoModel = mongoose.model("Todo", TodoSchema);
