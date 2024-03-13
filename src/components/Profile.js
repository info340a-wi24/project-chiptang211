import React, { useState, useEffect } from 'react';
import { getDatabase, ref, query, orderByChild, onValue, update, equalTo } from 'firebase/database';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function Profile() {
    const [goal, setGoal] = useState('');
    const [weight, setWeight] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [dailyFoods, setDailyFoods] = useState([]);
    const [dailyWorkouts, setDailyWorkouts] = useState([]);
    const [totalFoodCalories, setTotalFoodCalories] = useState(0);
    const [totalWorkoutCalories, setTotalWorkoutCalories] = useState(0);
    const userProfileId = 'userProfileId';

    useEffect(() => {
        const db = getDatabase();
        const profileRef = ref(db, `profiles/${userProfileId}`);

        onValue(profileRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setGoal(data.current_goal || '');
                setWeight(data.current_weight || '');
            }
        }, {
            onlyOnce: true
        });

        fetchDailyData(date);
    }, [userProfileId, date]);

    useEffect(() => {
        const calculatedTotalFoodCalories = dailyFoods.reduce((acc, food) => acc + Number(food.calories), 0);
        setTotalFoodCalories(calculatedTotalFoodCalories);

        const calculatedTotalWorkoutCalories = dailyWorkouts.reduce((acc, workout) => acc + Number(workout.calories), 0);
        setTotalWorkoutCalories(calculatedTotalWorkoutCalories);
    }, [dailyFoods, dailyWorkouts]);

    const updateProfile = () => {
        const db = getDatabase();
        const profileRef = ref(db, `profiles/${userProfileId}`);
        update(profileRef, {
            current_goal: goal,
            current_weight: weight
        }).then(() => {
            alert('Profile updated successfully.');
        }).catch((error) => {
            console.error("Error updating profile: ", error);
            alert('Failed to update profile.');
        });
    };

    const fetchDailyData = (selectedDate) => {
        const db = getDatabase();
        const foodsQuery = query(ref(db, `foods`), orderByChild("date"), equalTo(selectedDate));
        onValue(foodsQuery, (snapshot) => {
            const foodsData = snapshot.val();
            const foodsList = foodsData ? Object.values(foodsData) : [];
            setDailyFoods(foodsList);
        });

        const workoutsQuery = query(ref(db, `workouts`), orderByChild("date"), equalTo(selectedDate));
        onValue(workoutsQuery, (snapshot) => {
            const workoutsData = snapshot.val();
            const workoutsList = workoutsData ? Object.values(workoutsData) : [];
            setDailyWorkouts(workoutsList);
        });
    };

    const changeDate = (offset) => {
        const currentDate = new Date(date);
        currentDate.setDate(currentDate.getDate() + offset);
        setDate(currentDate.toISOString().split('T')[0]);
    };

    const barChartData = {
        labels: ['Calorie Intake', 'Calorie Burned'],
        datasets: [
            {
                label: 'Calories',
                data: [totalFoodCalories, totalWorkoutCalories],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 2,
            },
        ],
    };

    const barChartOptions = {
        indexAxis: 'y',
    };

    const foodCaloriesData = dailyFoods.map(food => food.calories);
    const foodLabels = dailyFoods.map(food => food.foodName);
    const workoutCaloriesData = dailyWorkouts.map(workout => workout.calories);
    const workoutLabels = dailyWorkouts.map(workout => workout.name);

    const pieChartDataFoods = {
        labels: foodLabels,
        datasets: [
            {
                data: foodCaloriesData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)', // pink
                    'rgba(54, 162, 235, 0.2)', // blue
                    'rgba(255, 206, 86, 0.2)', // yellow
                    'rgba(75, 192, 192, 0.2)', // green
                    'rgba(153, 102, 255, 0.2)', // purple
                    'rgba(255, 159, 64, 0.2)', // orange
                    'rgba(199, 199, 199, 0.2)', // grey
                    'rgba(83, 102, 255, 0.2)', // indigo
                    'rgba(255, 129, 102, 0.2)', // coral
                    'rgba(34, 202, 236, 0.2)' // teal
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)', // pink
                    'rgba(54, 162, 235, 1)', // blue
                    'rgba(255, 206, 86, 1)', // yellow
                    'rgba(75, 192, 192, 1)', // green
                    'rgba(153, 102, 255, 1)', // purple
                    'rgba(255, 159, 64, 1)', // orange
                    'rgba(199, 199, 199, 1)', // grey
                    'rgba(83, 102, 255, 1)', // indigo
                    'rgba(255, 129, 102, 1)', // coral
                    'rgba(34, 202, 236, 1)' // teal
                ],
                borderWidth: 2,
            },
        ],
    };

    const pieChartDataWorkouts = {
        labels: workoutLabels,
        datasets: [
            {
                data: workoutCaloriesData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)', // pink
                    'rgba(54, 162, 235, 0.2)', // blue
                    'rgba(255, 206, 86, 0.2)', // yellow
                    'rgba(75, 192, 192, 0.2)', // green
                    'rgba(153, 102, 255, 0.2)', // purple
                    'rgba(255, 159, 64, 0.2)', // orange
                    'rgba(199, 199, 199, 0.2)', // grey
                    'rgba(83, 102, 255, 0.2)', // indigo
                    'rgba(255, 129, 102, 0.2)', // coral
                    'rgba(34, 202, 236, 0.2)' // teal
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)', // pink
                    'rgba(54, 162, 235, 1)', // blue
                    'rgba(255, 206, 86, 1)', // yellow
                    'rgba(75, 192, 192, 1)', // green
                    'rgba(153, 102, 255, 1)', // purple
                    'rgba(255, 159, 64, 1)', // orange
                    'rgba(199, 199, 199, 1)', // grey
                    'rgba(83, 102, 255, 1)', // indigo
                    'rgba(255, 129, 102, 1)', // coral
                    'rgba(34, 202, 236, 1)' // teal
                ],
                borderWidth: 2,
            },
        ],
    };

    return (
        <main>
            <section id="profile">
                <h1>Profile</h1>
                <div>
                    <p>Love eating fast food but want to offset calories?</p>
                    <p>Your current goal is <span id="current_goal">{goal}</span> Cal.</p>
                    <p>Your current weight is <span id="current_weight">{weight}</span> lbs.</p>
                </div>
                <div>
                    <form id="profile_update" className="filter">
                        <label htmlFor="updated_goal">Update Your Calorie Goal:</label>
                        <input type="number" id="updated_goal" value={goal} onChange={(e) => setGoal(e.target.value)} /><br />
                        <label htmlFor="updated_weight">Update Your Weight:</label>
                        <input type="number" id="updated_weight" value={weight} onChange={(e) => setWeight(e.target.value)} /><br />
                    </form>
                </div>
                <button id="update_profile_button" onClick={updateProfile}>Update</button>
            </section>
            <section>
                <h2>Your Food and Fitness History</h2>
                <div className="filter">
                    <button onClick={() => changeDate(-1)}>-</button>
                    <p><span>{date}</span></p>
                    <button onClick={() => changeDate(1)}>+</button>
                </div>
                <h2>Calorie Stats for {date}</h2>

                <div className="profile-result">
                    <div className="chart-container">
                            <Bar data={barChartData} options={barChartOptions} />
                    </div>

                    <div id="info_box">
                        <p>Total Food Calories: {totalFoodCalories}</p>
                        <p>Total Workout Calories: {totalWorkoutCalories}</p>
                        <p>Net Calorie Difference: {totalFoodCalories - totalWorkoutCalories}</p>
                    </div>
                </div>

                <div id="food">
                    <h2>Food</h2>

                    <div className="profile-result">
                        <div className="chart-container">
                            <Pie data={pieChartDataFoods} />
                        </div>

                        <div className="info_box">
                            {dailyFoods.map((food, index) => (
                                <div key={index} className="item">
                                    <h3>{food.foodName}</h3>
                                    <p>{food.calories} calories</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div id="workout">
                    <h2>Workouts</h2>

                    <div className="profile-result">
                        <div className="chart-container">
                            <Pie data={pieChartDataWorkouts} />
                        </div>

                        <div className="info_box">
                            {dailyWorkouts.map((workout, index) => (
                                    <div key={index} className="item">
                                        <h3>{workout.name}</h3>
                                        <p>{workout.calories} calories</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Profile;
