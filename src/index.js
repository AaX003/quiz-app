import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from './components/Main';
import QuestionScreen from './components/Questions';
import ProgrammingQuiz from './components/Programming';
import HistoryQuiz from './components/History';
import ScienceQuiz from './components/Science';
import AnimeQuiz from './components/Anime';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<MainScreen />}/>
      <Route path="/questions" element={<QuestionScreen />}/>
      <Route path="/programming" element={<ProgrammingQuiz />}/>
      <Route path="/history" element={<HistoryQuiz />}/>
      <Route path="/science" element={<ScienceQuiz />}/>
      <Route path="/anime" element={<AnimeQuiz />}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
