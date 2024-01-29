# App Proposal

1. Who are the users of the application? That is, who will be accessing the website? What impacts might this app have on minority groups?
- Our Fitness and Food Nutrition web app is primarily designed for individuals who are keen on monitoring their daily calorie intake and strive to maintain a healthy lifestyle. This app is particularly beneficial for those who aim to manage their weight, fitness enthusiasts, and people with specific dietary requirements or health conditions that necessitate careful food and activity tracking.

2. What will the users do with the web app? What kind of interactive features are you expecting to provide? Remember that you app will need to include at least "two and a half" significant features; be sure to explicitly identify and explain what all of them are! Remember that "viewing" information or navigating ("going to") to something isn't a feature!
What kind of information will the users be viewing? If intend to use data from an external source (a csv file or an API), include a link and citation to that data.
    1. ##Calorie Intake Tracking:## Users can log their daily food consumption by searching and selecting items from our food database. This feature includes an option to save meals as presets for easy future tracking. The nutritional values of the food items are sourced from a JSON dataset (https://github.com/terrenjpeterson/caloriecounter/blob/master/src/data/foods.json).
    2. ##Workout Logging:## The app allows users to record their daily physical activities, either by selecting from preset workout options or by entering custom activities. The duration and type of exercise are factored in to calculate calories burned. This feature utilizes data from the "Calories Burned API" (https://api-ninjas.com/api/caloriesburned).
    3. ##Calorie History Analysis:## Users can review their weekly calorie intake and expenditure history, providing insights into their net calorie gain or loss. This helps in long-term tracking and planning of diet and fitness goals.

3. If you insist on using an API, confirm that you'll be able to access it from a client-side app by testing it at https://joelwross.github.io/cors-test/ . If you can't get data back from this testing site, then it won't work with your project.
    - "Calories Burned API" passed the test


4. How will using this app help to solve your chosen problem? That is, how is it a solution to the problem you described?
Remember the app doesn't need to have "business value". But as Informatics students we care about the practical usage and impacts of systems, not just their implementation. Be sure to consider that in your proposal!
    - This app is a onestop solution for individuals aiming to maintain or achieve a healthier lifestyle. By providing tools for tracking and analyzing food intake and physical activities, the app empowers users to make informed decisions about their diet and exercise habits. It encourages a more conscious approach to eating and physical fitness, potentially leading to improved overall health and well-being.