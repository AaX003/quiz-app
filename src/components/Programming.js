import "../css/Quiz.css";

import { Link } from "react-router-dom";
import { useState } from "react";

// ICONS
import { IoMdArrowBack } from "react-icons/io";
import { FcCheckmark } from "react-icons/fc";

function ProgrammingQuiz() {
    const [choices, setChoices] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wrong, setWrong] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    const questionList = [
        {
            id: 1,
            text: "Which of the following is NOT a JavaScript datatype?",
            options: ["String", "Boolean", "Float", "Number"],
            answer: "Float"
        },
        {
            id: 2,
            text: "What does CSS stand for?",
            options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Syntax"],
            answer: "Cascading Style Sheets"
        },
        {
            id: 3,
            text: "Which element is used to add an element to the end of an array in JavaScript?",
            options: ["append()", "push()", "add()", "pop()"],
            answer: "push()"
        },
        {
            id: 4,
            text: "Which symbol do you use to comment in Python?",
            options: ["$", "&", ">", "#"],
            answer: "#"
        },
        {
            id: 5,
            text: "What is the correct way to write a function in Python?",
            options: ["function myFunc():", "def myFunc():", "create myFunc():", "func myFunc():"],
            answer: "def myFunc():"
        },
        {
            id: 6,
            text: "Which HTML tag is used for creating hyperlinks?",
            options: ["<href>", "<link>", "<a>", "<url>"],
            answer: "<a>"
        },
        {
            id: 7,
            text: "In React, which hook is used to add state to a functional component?",
            options: ["useFetch", "useState", "useClass", "useStore"],
            answer: "useState"
        },
        {
            id: 8,
            text: "Which SQL command retrieves data from a table?",
            options: ["GET", "SELECT", "FETCH", "QUERY"],
            answer: "SELECT"
        },
        {
            id: 9,
            text: "Which HTTP status code means 'Not Found'?",
            options: ["200", "301", "403", "404"],
            answer: "404"
        },
        {
            id: 10,
            text: "Which Git command creates a new branch?",
            options: ["git branch <name>", "git init <name>", "git switch -D", "git remote add <name>"],
            answer: "git branch <name>"
        }
    ];

    const q = currentIndex;
    const currentQuestion = questionList[currentIndex];
    const isSelected = choices[q] ?? null;
    const shownAnswer = Boolean(isSelected);

    const rightAnswers = [];
    const wrongAnswers = [];

    questionList.forEach((q, index) => {
        const select = choices[index];
        if (select === q.answer) {
            rightAnswers.push(index);
        } else {
            wrongAnswers.push(index);
        }
    })

    const getStyle = (option) => {
        if (!shownAnswer) return null;

        const isCorrectOption = option === currentQuestion.answer;

        // If it's the picked option: green if correct, red if wrong
        if (isSelected === option) {
            return { backgroundColor: isCorrectOption ? "#0b702dff" : "#7f1f1fff" };
        }

        // If the pick was wrong, also highlight the correct option
        if (!correct && isCorrectOption) {
            return { backgroundColor: "#0b702dff" };
        }

        return undefined;
    }

    const restartGame = () => {
        setScore(0);
        setChoices({});
        setCurrentIndex(0);
        setShowResults(false);
    }

    
return (
  <div className="container">
    <header id="programming-title" className="title">
      <h3 className="header">Programming</h3>
    </header>
    <Link to="/" className="home-btn"><IoMdArrowBack /></Link>

    {!showResults && (
        <section id="quiz" className="quiz-screen">
        <p className="progress">Question {currentIndex + 1} of {questionList.length}</p>
        <p className="question">{currentQuestion.text}</p>
        <main className="question-container">
            {currentQuestion.options.map((option, index) => (
                <label
                key={`${q}-${index}`}
                className="choices"
                // highlight only the picked option
                style={getStyle(option)}
                >
                <input
                    type="radio"
                    name={`question-${q}`}
                    value={option}
                    checked={isSelected === option}
                    onChange={() => {

                    const isRight = option === currentQuestion.answer;

                    if (isRight) setScore(prevScore => prevScore + 1);

                    // record selection for this question
                    setChoices(prev => ({ ...prev, [q]: option }));

                    // flash feedback color
                    setWrong(!isRight);
                    setCorrect(isRight);

                    // auto-advance after a short pause
                    setTimeout(() => {
                        const isLast = q === questionList.length - 1;
                        if (isLast) {
                        setShowResults(true);
                        } else {
                        setCurrentIndex(i => i + 1);
                        // clear feedback for next question
                        setWrong(false);
                        setCorrect(false);
                        }
                    }, 1200);
                    }}
                    // prevent re-clicks during the 600ms feedback window
                    disabled={wrong || correct}
                />
                {option}
                </label>
            ))}
        </main>
    </section>
    )}
    
    {showResults && (
        <section className="results-container">
            {showResults && (
               <main className="results">
                    <h2 className="result-msg">You completed the quiz!</h2>
                    <p className="score"><span className="larger-text">{score}</span> / {questionList.length}</p>
                    <span className="svg-wrapper__results"><FcCheckmark /></span>
                    <button className="restart-btn" onClick={restartGame}>Try Again</button>
                    <Link to="/" className="category-btn">Return Home</Link>
               </main>
            )}
        </section>
    )}
  </div>
);

}
export default ProgrammingQuiz