import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import { useState } from 'react';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState([]);

  return (
    <div className="App">
      <Router>
        <header><h1> Full Stack MERN App - Exercise Tracker </h1>
          <p>
            This app is an example of a Single Page Application (SPA) that will track exercises that are created and edited
            by the user. <br></br>This SPA uses React for the front-end user interface, and REST API, specifictly using Node and Express,
            for the back-end web service.
          </p>
          <h4>How to use app:</h4>
          <p>
            To use the app, simply click on the 'Create' link in the navigation bar and fill out the form. <br></br>Once there are exercises in the table,
            you can edit or delete the exercise by clicking on the icons to the right of the exercise.
          </p>
          <br></br>
          <nav>
              <Link to="/">Home</Link>
              <Link to="/create-exercise">Create</Link>
          </nav>
        </header>
          <div className="App-header">
            <Route path="/" exact>
              <HomePage setExerciseToEdit={setExerciseToEdit}/>
            </Route>
            <Route path="/create-exercise"> 
              <CreateExercisePage />
            </Route>
            <Route path="/edit-exercise">
              <EditExercisePage exerciseToEdit={exerciseToEdit} />
            </Route>
            </div>
        <footer>© 2022 Timothy Butler</footer>
      </Router>
    </div>
  );
}

export default App;