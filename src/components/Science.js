import "../css/Quiz.css";

import { Link } from "react-router-dom";
import { useState } from "react";

// ICONS
import { IoMdArrowBack } from "react-icons/io";
import { FcCheckmark } from "react-icons/fc";

function ScienceQuiz() {
    const [choices, setChoices] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wrong, setWrong] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    const questionList = [
        {
            id: 1,
            text: "What is the smallest unit of matter?",
            options: ["Molecule", "Cell", "Atom", "Proton"],
            answer: "Atom"
        },
        {
            id: 2,
            text: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Saturn", "Neptune"],
            answer: "Mars"
        },
        {
            id: 3,
            text: "What is the green substance in plants called?",
            options: ["Chlorophyll", "Chloroform", "Bleach", "Aloe"],
            answer: "Chlorophyll"
        },
        {
            id: 4,
            text: "What is the chemical symbol for gold?",
            options: ["Na", "H2O", "O", "Au"],
            answer: "Au"
        },
        {
            id: 5,
            text: "Which organ produces insulin?",
            options: ["Liver", "Heart", "Kidney", "Pancreas"],
            answer: "Pancreas"
        },
        {
            id: 6,
            text: "What is the food-making process for plants?",
            options: ["Photosynthesis", "Transpiration", "Evaporation", "Cooking"],
            answer: "Photosynthesis"
        },
        {
            id: 7,
            text: "Which gas do plants absorb from the atmosphere?",
            options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
            answer: "Carbon dioxide"
        },
        {
            id: 8,
            text: "What is the SI unit of force?",
            options: ["Joule", "Newton", "Watt", "Pascal"],
            answer: "Newton"
        },
        {
            id: 9,
            text: "Which part of the cell contains most of the genetic material (DNA)?",
            options: ["Ribosome", "Mitochondrion", "Nucleus", "Golgi apparatus"],
            answer: "Nucleus"
        },
        {
            id: 10,
            text: "What type of chemical bond involves sharing electron pairs between atoms?",
            options: ["Ionic", "Covalent", "Metallic", "Hydrogen"],
            answer: "Covalent"
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
    <header id="science-title" className="title">
      <h3 className="header">Science</h3>
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
export default ScienceQuiz