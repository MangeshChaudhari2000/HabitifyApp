import mongoose from "mongoose";

const habbitSchemas = new mongoose.Schema({
    habit: {
        type: String,
        required: true
    },
    goal: {
        type: String,
    },
    streak: {
        type: Number,
        default: 0
    },
    check: [{
        date: { type: String },
        status: {
            type: String,
            enum: ["done", "reject", "none"],
            default: "none"
        }
    }]
},
    {
        timestamps: true
    }
);

habbitSchemas.pre('save', function (next) {
    const habit = this;

 
    // Doing validation before saving
    if (!habit) {
        const error = new Error('Habit is required');
        return next(error);
    }

    // If everything is okay, continue with saving
    next();
});



export const HabbitModel = mongoose.model('habbit', habbitSchemas);

