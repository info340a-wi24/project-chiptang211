import React from 'react';

function Profile() {
  return (
    <main>
        <section id="profile">
            <h1>Welcome Back, <span id="name">username</span>!</h1>
            <div>
                <p>Love eating fast food but want to offset calories?</p>
                <p>Your current goal is <span id="current_goal">2000</span> Cal.</p>
                <p>Your current weight is <span id="current_weight">150</span> lbs.</p>
            </div>
            <div>
                <form id="workout_filter" className="filter">
                    <label htmlFor="updated_goal">Update Your Calorie Goal:</label>
                    <input type="number" id="updated_goal" /><br />
                    <label htmlFor="updated_weight">Update Your Weight:</label>
                    <input type="number" id="updated_weight" /><br />
                </form>
            </div>
            <button id="update_goal_button">Update</button>
        </section>
        <section>
            <h2>Your Food and Fitness History</h2>
            <div className="filter">
                <button id="history_left_button">Left</button>
                <p>Week <span id="history_week">1</span> of <span id="history_year">2024</span></p>
                <button id="history_right_button">Right</button>
            </div>
            <div>
                <p className="item">GRAPH PLACE HOLDER</p>
            </div>
        </section>
    </main>
  );
}

export default Profile;
