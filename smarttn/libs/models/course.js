// models/Course.js
import mongoose from 'mongoose';

const ContentBlockSchema = new mongoose.Schema({
    type: { type: String, enum: ['text', 'image', 'video'], required: true },
    content: { type: String }, // Contenuto testuale per 'text', URL per 'image' e 'video'
    caption: { type: String }, // Didascalia opzionale per immagini o video
});

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true }, // Può essere un ID referenziato o un nome
    category: { type: String }, // Es: "programmazione", "design"
    contentBlocks: [ContentBlockSchema], // Array di blocchi di contenuto
});

const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);


export default Course;
