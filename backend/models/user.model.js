import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlenght: 6
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    profilePic: {
        type: String,
        default: "",
    },
}, { timestamps: true });



export default mongoose.model("User", userSchema);
// export default userSchema;