import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://filippotancon:Sx8aZaQeoxLgB3TY@project.yn9wy.mongodb.net/",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("Connesso a MongoDB");
    } catch (error) {
        console.error("Errore di connessione a MongoDB:", error);
    }
};

export default connectMongoDB;
