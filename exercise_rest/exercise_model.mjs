import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);

const createExercise = async (name, reps, weight, unit, date) => {
    // Call the constructor to create an instance of the model class Exercise
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    // Call save to persist this object as a document in MongoDB
    return exercise.save();
};

const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
};

const findExercises = async (filter) => {
    const query = Exercise.find(filter);
    return query.exec();
};

const updateExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.updateOne({_id: _id},{name: name, reps: reps, weight: weight, unit: unit, date: date});
    return result.matchedCount;
};

const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    return result.deletedCount;
};

/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
};

/**
*
* @param {string} unit
* Return true if unit format is in 'kgs' or 'lbs
*/
function isUnitValid(unit) { 
    if (unit === 'kgs' || unit === 'lbs') {
        return true
    } else {
        return false
    };
};

export { createExercise, findExerciseById, findExercises, updateExercise, deleteById, isDateValid, isUnitValid };