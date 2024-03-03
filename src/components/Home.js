import React from 'react';

function Home() {
  return (
    <main>
      <section id="main">
                <h1>Eating Better, Feeling Better</h1>
                <h2>Empowering College Students to Master Their Nutrition and Fitness</h2>
                <p>Amid college's busy life, balancing studies, social life, and jobs, nutrition and fitness can be neglected due to fast food convenience and lack of exercise time. "Eating Better, Feeling Better" offers a solution, making meal and workout tracking as simple as using social media, designed specifically for students seeking a healthier lifestyle without the stress.</p>
            </section>

            <section id="introduction">
                <article>
                    <img src="/img/fitness.jpg" alt="Workout Stats"></img>
                    <div>
                        <h2>Simplified Tracking</h2>
                        <p>Say goodbye to complex charts and confusing metrics. Enter the fast food you've eaten and the workouts you've done, and let us handle the rest. Our intuitive platform calculates your net calories, giving you a clear picture of your daily intake versus your physical activity.</p>
                    </div>
                </article>

                <article>
                    <img src="/img/food.jpg" alt="Food Stats"></img>
                    <div>
                        <h2>Customized for You</h2>
                        <p>Whether you're a fast-food aficionado or a fitness beginner, our system is tailored to meet you where you are. No background in nutrition or exercise planning? No problem. We provide step-by-step guidance to help you make informed choices.</p>
                    </div>
                </article>
            </section>

            <section id="steps">
                <h2>How It Works?</h2>
                <ol>
                    <li>Log Your Meals: Quickly input the fast food you've eaten using our searchable database.</li>
                    <li>Track Your Workouts: Whether it's a gym session or a quick workout between classes, log your activities to see how they balance with your caloric intake.</li>
                    <li>View Your Progress: Get instant feedback on your net calories and track your progress over time. Set goals, adjust your plans, and watch as you move closer to a healthier you.</li>
                </ol>
            </section>
    </main>
  );
}

export default Home;
