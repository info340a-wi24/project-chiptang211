import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BmiInfoPage() {
  const { category } = useParams();

  const content = {
    'Underweight': `Being underweight can be a sign of not getting enough nutrition, which can lead to health issues such as weakened immunity, osteoporosis, and fertility problems. It's important to consume a balanced diet rich in vitamins, minerals, and calories sufficient to reach a healthier weight. Consider consulting a nutritionist or healthcare provider for personalized advice and dietary strategies to achieve a healthy weight. Regular exercise, especially strength training, can also help in building muscle mass and improving overall health.`,

    'Healthy Weight': `Congratulations on maintaining a healthy weight! This category indicates a balanced body weight, which is associated with a lower risk of chronic diseases such as heart disease, diabetes, and high blood pressure. Continue to maintain a healthy lifestyle through a balanced diet and regular physical activity. Eating a variety of foods, including plenty of fruits and vegetables, whole grains, lean proteins, and healthy fats, along with consistent exercise, are key to staying in this category. Keep up the good work!`,

    'Overweight': `Being overweight indicates that you're above the weight considered healthy for your height. This can increase your risk of chronic diseases such as heart disease, diabetes, and high blood pressure. Consider adopting a healthier diet with fewer calories and more nutrients, along with increasing your physical activity. Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity a week, combined with muscle-strengthening exercises on two or more days a week. Reducing portion sizes, eating whole foods, and consulting a healthcare provider or dietitian can also support weight loss efforts.`,

    'Obesity': `Obesity is a condition that significantly increases your risk of various health issues, including heart disease, diabetes, high blood pressure, and certain cancers. Achieving and maintaining a healthier weight is crucial for your overall health. Consider consulting a healthcare provider to discuss a weight loss plan tailored to your needs, which may include dietary changes, increased physical activity, behavior changes, or even medical treatments. Support from a multidisciplinary team including dietitians, physical therapists, and mental health professionals can be very helpful in your journey towards a healthier weight.`
  };

  const navigate = useNavigate();

  return (
    <div>
      <section>
        <h1>BMI Information: {category}</h1>
        <div>
          <h2>Your analysis report</h2>
          <p>{content[category]}</p>
        </div>
        <button onClick={() => navigate('/profile')}>Back to Profile</button>
      </section>
      <section>
        <div>
          <h2>Learn more about BMI</h2>
          <p>Body mass index (BMI) is a person's weight in kilograms divided by the square of height in meters. BMI is an inexpensive and easy screening method for weight category—underweight, healthy weight, overweight, and obesity For adults 20 years old and older, BMI is interpreted using standard weight status categories. These categories are the same for men and women of all body types and ages.</p>
          <table id="bmi_table">
            <tbody>
              <tr>
                <th>BMI</th>
                <th>Weight Status</th>
              </tr>
              <tr>
                <td>Below 18.5</td>
                <td>Underweight</td>
              </tr>
              <tr>
                <td>18.5 - 24.9</td>
                <td>Healthy Weight</td>
              </tr>
              <tr>
                <td>25.0 - 29.9</td>
                <td>Overweight</td>
              </tr>
              <tr>
                <td>30.0 and Above</td>
                <td>Obesity</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default BmiInfoPage;
