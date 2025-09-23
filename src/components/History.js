import "../css/Quiz.css";

import { Link } from "react-router-dom";
import { useState } from "react";

// ICONS
import { IoMdArrowBack } from "react-icons/io";
import { RiResetLeftLine, RiHomeLine  } from "react-icons/ri";
import { FcCheckmark } from "react-icons/fc";

function HistoryQuiz() {
    const [choices, setChoices] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wrong, setWrong] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    const questionList = [
        {
        id: 1,
        text: "Which year did WWII end?", 
        options: ["1954", "1955", "1945", "1944"],
        answer: "1945"
        },
        {
            id: 2,
            text: "Who was the first person to walk on the moon?",
            options: ["Neil Armstrong", "Frank Sinatra", "Elon Musk", "Jeff Bezos"],
            answer: "Neil Armstrong"
        },
        {
            id: 3,
            text: "Which ancient civilization built Machu Picchu?",
            options: ["Aztecs", "Incas", "Powhatans", "Olmecs"],
            answer: "Incas"
        },
        {
            id: 4,
            text: "Who painted the Mona Lisa",
            options: ["Leonardo DiCaprio", "Frida Khalo", "Diego Rivera", "Leonardo Da Vinci"],
            answer: "Leonardo Da Vinci"
        },
        {
            id: 5,
            text: "What did the Boston Tea Party symbolize?",
            options: ["Independence from Great Britain", "Delicious Tea", "War", "Subservience to Great Britain"],
            answer: "Independence from Great Britain"
        },
        {
            id: 6,
            text: "What was Thomas Jefferson's house called?",
            options: ["The Jeffersons", "The Great Palace", "Monticello", "The Jefferson Cathedral"],
            answer: "Monticello"
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
    <header id="history-title" className="title">
      <h3 className="header">History</h3>
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
                    <button className="restart-btn" onClick={restartGame}><RiResetLeftLine />Try Again</button>
                    <Link to="/" className="category-btn"><RiHomeLine />Choose another category</Link>
               </main>
            )}
        </section>
    )}
  </div>
);

}
export default HistoryQuiz