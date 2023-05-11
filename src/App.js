import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import CustomersList from './components/CustomersList';
import TrainingsList from './components/TrainingsList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/customers">Customers</Link>
              </li>
              <li>
                <Link to="/trainings">Trainings</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/customers" element={<CustomersList />} />
            <Route path="/trainings" element={<TrainingsList />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
