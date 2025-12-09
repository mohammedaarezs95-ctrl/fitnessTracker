//create a advanced fitness tracker api with endpoints POST /api/workouts to add date exercise duration(in minutes) calories burned, GET /api/workouts to get all workouts as a JSON array, PUT /api/workouts/:id to update duration calories burned exercise, DELETE /api/workouts/:id to delete workout
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let workouts = [];
let currentId = 1;

// POST /api/workouts
app.post('/api/workouts', (req, res) => {
    const { date, exercise, duration, caloriesBurned } = req.body;
    const newWorkout = { id : currentId++, date, exercise, duration, caloriesBurned };
    workouts.push(newWorkout);
    res.status(201).json(newWorkout);
});

// GET/api/workouts
app.get('/api/workouts', (req, res) => {
    res.json(workouts);
});

// PUT /api/workouts/:id
app.put('/api/workouts/:id', (req, res) => {
    const workoutId = parseInt(req.params.id);
    const { date, exercise, duration, caloriesBurned } = req.body;
    const workout = workouts.find(w => w.id === workoutId);
    if (workout) {
        workout.date = date || workout.date;
        workout.exercise = exercise || workout.exercise;
        workout.duration = duration || workout.duration;
        workout.caloriesBurned = caloriesBurned || workout.caloriesBurned;
        res.json(workout);
    } else {
        res.status(404).json({ message: 'Workout not found' });
    }
});

// DELETE /api/workouts/:id
app.delete('/api/workouts/:id', (req, res) => {
    const workoutId = parseInt(req.params.id);
    const index = workouts.findIndex(w => w.id === workoutId);
    if (index !== -1) {
        workouts.splice(index, 1);
        res.json({ message: 'Workout deleted' });
    } else {
        res.status(404).json({ message: 'Workout not found' });
    }
    }
);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:3000 ${PORT}`);
});