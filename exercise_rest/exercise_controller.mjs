import 'dotenv/config';
import * as exercises from './exercise_model.mjs';
import express from 'express';
import { body, validationResult } from 'express-validator';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
 * Create a new exercise with the name, reps, weight, unit and date provided in the body
 */
 app.post('/exercises', 
    // name should be at least 1 character
    body('name').isLength({ min: 1 }),
    // reps must be greater than 0
    body('reps').isInt({ min: 1 }),
    // weight must be greater than 0
    body('weight').isInt({ min: 1 }),
    (req, res) => {
        // Check for any errors with user inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ Error: 'Invalid request' });
        } else if ( exercises.isUnitValid(req.body.unit) === false) {
           return res.status(400).json({ Error: 'Invalid request' });
        } else if ( exercises.isDateValid(req.body.date) !== true) {
            return res.status(400).json({ Error: 'Invalid request' });
        };
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            // In case of an error, send back status code 400 in case of an error.
            // A better approach will be to examine the error and send an
            // error status code corresponding to the error.
            res.status(400).json({ Error: 'Invalid request' });
        });
});


/**
 * Retrive the movie corresponding to the ID provided in the URL.
 */
 app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request failed' });
        });

});

/**
 * Retrieve exercise(s). 
 * If the query parameters include reps, then only the exercises for those reps are returned.
 * Otherwise, all exercises are returned.
 */
 app.get('/exercises', (req, res) => {
    let filter = {};
    // Is there a query parameter named reps? If so add a filter based on its value.
    if (req.query.reps !== undefined){
        filter = { reps: req.query.reps };
    }
    // Is there a query parameter named weight? If so add a filter based on its value.
    if (req.query.weight !== undefined){
        filter = { weight: req.query.weight };
    }
    // Is there a query parameter named unit? If so add a filter based on its value.
    if (req.query.unit !== undefined){
        filter = { unit: req.query.unit };
    }
    // Is there a query parameter named date? If so add a filter based on its value.
    if (req.query.date !== undefined){
        filter = { date: req.query.date };
    }
    exercises.findExercises(filter, '', 0)
        .then(exercises => {
            res.send(exercises);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed' });
        });

});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its name, reps, weight, unit and date to the values provided in the body.
 */
 app.put('/exercises/:_id',    
    // name should be at least 1 character
    body('name').isLength({ min: 1 }),
    // reps must be greater than 0
    body('reps').isInt({ min: 1 }),
    // weight must be greater than 0
    body('weight').isInt({ min: 1 }),
    (req, res) => {
        // Check for any errors with user inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ Error: 'Invalid request' });
        } else if ( exercises.isUnitValid(req.body.unit) === false) {
            return res.status(400).json({ Error: 'Invalid request' });
        } else if ( exercises.isDateValid(req.body.date) !== true) {
            return res.status(400).json({ Error: 'Invalid request' });
        };
    exercises.updateExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numMatched => {
            if (numMatched === 1) {
                res.json({name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
            } else {
                res.status(404).json({ Error: 'Not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request invalid' });
        });
});

/**
 * Delete the movie whose id is provided in the query parameters
 */
 app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});