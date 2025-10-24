import "../css/Quiz.css";

import { Link } from "react-router-dom";
import { useState } from "react";

// SVGS
import { RiRestartLine } from "react-icons/ri";
import { IoIosHome } from "react-icons/io";

function HistoryQuiz() {
    const [choices, setChoices] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wrong, setWrong] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    const [gameKey, setGameKey] = useState(0);

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
            text: "Who painted the Mona Lisa?",
            options: ["Leonardo DiCaprio", "Frida Kahlo", "Diego Rivera", "Leonardo da Vinci"],
            answer: "Leonardo da Vinci"
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
        },
        {
            id: 7,
            text: "Which empire was ruled by Genghis Khan?",
            options: ["Roman", "Mongol", "Ottoman", "Persian"],
            answer: "Mongol"
        },
        {
            id: 8,
            text: "In what year did the Berlin Wall fall?",
            options: ["1989", "1991", "1979", "1961"],
            answer: "1989"
        },
        {
            id: 9,
            text: "Who delivered the 'I Have a Dream' speech?",
            options: ["Martin Luther King Jr.", "Malcolm X", "John F. Kennedy", "Frederick Douglass"],
            answer: "Martin Luther King Jr."
        },
        {
            id: 10,
            text: "Which city was the capital of the Byzantine Empire?",
            options: ["Athens", "Rome", "Constantinople", "Alexandria"],
            answer: "Constantinople"
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
            return { backgroundColor: isCorrectOption ? "#16d656ff" : "#e91717ff" };
        }

        // If the pick was wrong, also highlight the correct option
        if (!correct && isCorrectOption) {
            return { backgroundColor: "#16d656ff" };
        }

        return undefined;
    }

    const handleNext = () => {
        setCurrentIndex(prev => prev + 1);
        setWrong(false);
        setCorrect(false);
    }

    const showResultsScreen = () => {
        setShowResults(true); // enables the results screen to show
    }

    const restartGame = () => {
        setScore(0);
        setChoices({});
        setCurrentIndex(0);
        setShowResults(false);
        setWrong(false);
        setCorrect(false);
        setGameKey(k => k + 1);
    }

    
return (
  <div className="container">
    <header id="history-title" className="title">
      <h3 className="header">History</h3>
    </header>
    <Link to="/" className="home-btn"><IoIosHome /></Link>

    {!showResults && (
        <section id="quiz" key={gameKey} className="quiz-screen">
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
                    }}
                    // prevent re-clicks during the 600ms feedback window
                    disabled={wrong || correct}
                />
                {option}
                </label>
            ))}
        </main>
        <button 
            className="next-btn" 
            onClick={currentIndex === questionList.length - 1 ? showResultsScreen : handleNext}
        >
            {currentIndex === questionList.length - 1 ? "Show Results" : "Next Question"}
        </button>
    </section>
    )}
    
    {showResults && (
        <section className="results-container">
            {showResults && (
               <main className="results">
                    <h2 className="result-msg">You completed the quiz!</h2>
                    <p className="score"><span className="larger-text">{score}</span> / {questionList.length}</p>

                    <div className="btn-wrapper">
                        <button className="category-btn" onClick={restartGame} aria-label="Restart game"><RiRestartLine /></button>
                        <Link to="/" className="category-btn" aria-label="Home button"><IoIosHome /></Link>
                    </div>

               </main>
            )}
        </section>
    )}
  </div>
);

}
export default HistoryQuiz