import "../css/Questions.css";
import { Link } from "react-router-dom";

function QuestionScreen() {

  return (
    <div className="questions">
      <header id="questions-header" className="header__questions">
        <h2 className="header">
          Question Amount
        </h2>
        <p className="subheader">
          Choose how many questions 
          you would like on your quiz
        </p>
      </header>
      <section id="category-section__questions" className="question-amt">
        <main id="nav-btns" className="nav-btns__questions">
            <button className="number-btn">5</button>
            <button className="number-btn">10</button>
            <button className="number-btn">15</button>
            <button className="number-btn">20</button>
        </main>
      </section>
      <section id="back-to-home__questions" className="back-to-home">
        <Link to="/" className="back-btn">Back</Link>
      </section>
    </div>
  );
}

export default QuestionScreen;