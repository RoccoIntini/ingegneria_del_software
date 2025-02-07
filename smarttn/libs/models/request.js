import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false,
    }
});


export default Course;