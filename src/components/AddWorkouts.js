import React, { useState } from 'react';

function AddWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [addedWorkouts, setAddedWorkouts] = useState([]);
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');
  const [addDate, setAddDate] = useState(new Date().toISOString().split('T')[0]);

  const fetchWorkouts = async () => {
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/caloriesburned?activity=${activity}&duration=${duration}`, {
        headers: {
          'X-Api-Key': 'Sb8pD9QdQ7IR4ZcHC428MQ==mbuNuwC67CWxKGbt'
        }
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setWorkouts(data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const handleAddWorkout = (workout) => {
    setAddedWorkouts(prevWorkouts => [...prevWorkouts, { ...workout, date: addDate }]);
  };

  const handleDeleteWorkout = (indexToRemove) => {
    setAddedWorkouts(prevWorkouts => prevWorkouts.filter((_, index) => index !== indexToRemove));
  };

  return (
    <main className="add_page">
      <aside className="left_col">
        <section id="workout_filter_box">
          <h1>Add Your Workout</h1>
          <form class="filter">
            <label htmlFor="addDate">Date:</label>
            <input type="date" id="addDate" value={addDate} onChange={(e) => setAddDate(e.target.value)} /><br />
            <label htmlFor="activity">Workout Name:</label>
            <input type="text" id="activity" placeholder="running" value={activity} onChange={(e) => setActivity(e.target.value)} /><br />
            <label htmlFor="duration">Workout Duration (minutes):</label>
            <input type="number" id="duration" placeholder="60 minutes" value={duration} onChange={(e) => setDuration(e.target.value)} /><br />
          </form>
          <button onClick={fetchWorkouts}>Update</button>
        </section>

        <section>
          <h2>Workout List</h2>
          <div className="item_box">
            {workouts.map((workout, index) => (
              <div key={index} className="item">
                <h3>{workout.name}</h3>
                <p> Calories burned: {workout.total_calories}</p>
                <button onClick={() => handleAddWorkout(workout)}>Add</button>
              </div>
            ))}
          </div>
        </section>
      </aside>

      <aside className="right_col">
        <section>
          <h2>Added Workout</h2>
          <div className="item_box">
            {addedWorkouts.map((workout, index) => (
              <div key={index} className="item">
                <h3>{`${workout.name}`}</h3>
                <p>Calories burned: {workout.total_calories}</p>
                <p>Date: {workout.date}</p>
                <button onClick={() => handleDeleteWorkout(index)}>Delete</button>
              </div>
            ))}
          </div>
          <button onClick={() => console.log(addedWorkouts)}>Save</button>
        </section>
      </aside>
    </main>
  );
}

export default AddWorkouts;
