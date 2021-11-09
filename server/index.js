import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import timerRoutes from './routes/timerProfiles.js'
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/timer', timerRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(PORT, () => {
        console.log('Listening on port ' + PORT);
    }))
    .catch((error) => console.log(`Error message: ${error.message}`));