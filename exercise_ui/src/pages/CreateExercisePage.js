import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const CreateExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const history = useHistory();

    const createExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201){
            alert("Successfully added the exercise");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`
            );
        }
        history.push("/");
    };

    return (
        <div>
            <h2>Create Exercise</h2>
            <input
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Enter reps here"
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                placeholder="Enter weight here"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select value={unit} onChange={e => setUnit(e.target.value)}>
                <option value={"kgs"}>kgs</option>
                <option value={"lbs"}>lbs</option>
            </select>
            <input
                type="text"
                placeholder="Enter date ex. 01-01-22"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={createExercise}
            >Add</button>
        </div>
    );
}

export default CreateExercisePage;