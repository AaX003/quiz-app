import "../css/Quiz.css";

import { Link } from "react-router-dom";
import { useState } from "react";

// ICONS
import { IoMdArrowBack } from "react-icons/io";
import { FcCheckmark } from "react-icons/fc";

function AnimeQuiz() {
    const [choices, setChoices] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wrong, setWrong] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    const questionList = [
        {
            id: 1,
            text: "Who is the main character of My Hero Academia?",
            options: ["Todoroki", "Bakugou", "Deku", "Denki"],
            answer: "Deku"
        },
        {
            id: 2,
            text: "What is the fighting technique called in Demon Slayer?",
            options: ["Nen", "Devil Fruit", "Breathing Styles", "Stands"],
            answer: "Breathing Styles"
        },
        {
            id: 3,
            text: "Fill in the blank: The Phantom __",
            options: ["Troupe", "Group", "Thieves", "Gang"],
            answer: "Troupe"
        },
        {
            id: 4,
            text: "What was the name of the fox inside Naruto Uzumaki?",
            options: ["Kurama", "Karma", "Kurma", "Karama"],
            answer: "Kurama"
        },
        {
            id: 5,
            text: "What is the sport the characters play in Haikyuu?",
            options: ["Soccer", "Volleyball", "Tennis", "Basketball"],
            answer: "Volleyball"
        },
        {
            id: 6,
            text: "Who is the main antagonist from Death Note?",
            options: ["Light Yagami", "L", "Misa Amane", "Ryuk"],
            answer: "Light Yagami"
        },
        {
            id: 7,
            text: "Who is the protagonist of Chainsaw Man?",
            options: ["Denji", "Aki Hayakawa", "Makima", "Power"],
            answer: "Denji"
        },
        {
            id: 8,
            text: "Which Pokémon is #025 in the Pokédex?",
            options: ["Bulbasaur", "Eevee", "Pikachu", "Charmander"],
            answer: "Pikachu"
        },
        {
            id: 9,
            text: "What is the Tokyo campus called in Jujutsu Kaisen?",
            options: ["UA High", "Tokyo Jujutsu High", "Kyoto Jujutsu High", "Karasuno High"],
            answer: "Tokyo Jujutsu High"
        },
        {
            id: 10,
            text: "In Fullmetal Alchemist, which forbidden practice cost Ed his arm and Al his body?",
            options: ["Alkahestry", "Human Transmutation", "Equivalent Exchange", "Stone Forging"],
            answer: "Human Transmutation"
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
    <header id="anime-title" className="title">
      <h3 className="header">Anime</h3>
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
export default AnimeQuiz