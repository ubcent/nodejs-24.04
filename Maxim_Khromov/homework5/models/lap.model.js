const mongoose = require('mongoose');
const lapSchema = new mongoose.Schema({
    time: {
        type: String,
    },
    userId: {
        type: Number,
    },
    createdAt: {
        date: String,
    },
    isDeleted: {
        type: Boolean,
    },
});

mongoose.model('Lap', lapSchema);