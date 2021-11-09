import mongoose from 'mongoose';

const profileSchema = mongoose.Schema({
    profileName: String,
    timerList: [{
        id: String,
        name: String,
        order: Number,
        length: Number,
        edit: {
            type: Boolean,
            default: false
        }
    }
    ]
})

export default mongoose.model('TimerProfile', profileSchema);