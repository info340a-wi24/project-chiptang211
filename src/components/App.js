import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import AddFood from './AddFood';
import AddWorkouts from './AddWorkouts';
import Profile from './Profile';

function App() {

  return (
    <Router>
        <div>
            <Header />
                <Routes>
                    <Route path="/" element={<Home />} exact />
                    <Route path="/food" element={<AddFood />} />
                    <Route path="/workout" element={<AddWorkouts />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            <Footer />
        </div>
    </Router>
  );
}

export default App;
