import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push } from "firebase/database";

function AddWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [addedWorkouts, setAddedWorkouts] = useState([]);
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');
  const [weight, setWeight] = useState('');
  const [addDate, setAddDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const userProfileId = 'userProfileId';

  useEffect(() => {
    const db = getDatabase();
    const weightRef = ref(db, `profiles/${userProfileId}/current_weight`);
    onValue(weightRef, (snapshot) => {
      const fetchedWeight = snapshot.val();
      setWeight(fetchedWeight || '160');
    });
  }, [userProfileId]);

  const fetchWorkouts = async () => {
    setIsLoading(true); // Start loading indicator
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/caloriesburned?activity=${activity}&weight=${weight}&duration=${duration}`, {
        headers: {
          'X-Api-Key': 'Sb8pD9QdQ7IR4ZcHC428MQ==mbuNuwC67CWxKGbt'
        }
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setWorkouts(data);
      setError('');
    } catch (error) {
      console.error('Error fetching workouts:', error);
      setError('Failed to fetch workouts: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddWorkout = (workout) => {
    setAddedWorkouts(prevWorkouts => [...prevWorkouts, { ...workout, date: addDate }]);
  };

  const handleDeleteWorkout = (indexToRemove) => {
    setAddedWorkouts(prevWorkouts => prevWorkouts.filter((_, index) => index !== indexToRemove));
  };

  const saveWorkoutsToFirebase = () => {
    setIsLoading(true);
    const db = getDatabase();
    addedWorkouts.forEach((workout, index) => {
      const workoutsRef = ref(db, 'workouts');
      push(workoutsRef, {
          name: workout.name,
          calories: workout.total_calories,
          date: workout.date
      }).then(() => {
        if(index === addedWorkouts.length - 1) {
          setError('');
          setIsLoading(false);
          setSuccessMessage("All workout items have been successfully saved.");
          setTimeout(() => setSuccessMessage(''), 5000);
        }
      }).catch(error => {
        console.error("Error saving workout: ", error);
        setError("Failed to save workout: " + error.message);
      }).finally(() => {
        setIsLoading(false);
      });
    });
  };

  return (
    <main className="add_page">
      <aside className="left_col">
        <section id="workout_filter_box">
          <h1>Add Your Workout</h1>
          <p className='caption'>Powered by API Ninjas</p>
          <form class="filter">
            <di>
              <label htmlFor="addDate">Date:</label>
              <input type="date" id="addDate" value={addDate} onChange={(e) => setAddDate(e.target.value)} /><br />
            </di>
            <di>
              <label htmlFor="activity">Workout Name: </label>
              <input type="text" id="activity" placeholder="running" value={activity} onChange={(e) => setActivity(e.target.value)} /><br />
            </di>
            <di>
              <label htmlFor="duration">Workout Duration (minutes): </label>
              <input type="number" id="duration" placeholder="60 minutes" value={duration} onChange={(e) => setDuration(e.target.value)} /><br />
            </di>
          </form>
          <button onClick={fetchWorkouts}>Update</button>
        </section>

        <section>
          <h2>Workout List</h2>
          {isLoading && <div>Loading...</div>}
          <div className="item_box">
            {workouts.length > 0 ? (
              workouts.map((workout, index) => (
                <div key={index} className="item">
                  <h3>{workout.name}</h3>
                  <p>Calories burned: {workout.total_calories}</p>
                  <button onClick={() => handleAddWorkout(workout)}>Add</button>
                </div>
              ))
            ) : (
              <p>Search Workout to Continue</p>
            )}
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
          {error && <div className="error">{error}</div>}
          {successMessage && <div className="success">{successMessage}</div>}
          <button onClick={saveWorkoutsToFirebase}>Save</button>
        </section>
      </aside>
    </main>
  );
}

export default AddWorkouts;
