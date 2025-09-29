import "../css/Main.css";
import { Link } from "react-router-dom";

// ICONS
import { FaCode } from "react-icons/fa";
import { MdScience } from "react-icons/md";
import { IoBookSharp } from "react-icons/io5";
import { BiMath } from "react-icons/bi";
import { SiCrunchyroll } from "react-icons/si";

function MainScreen() {
  return (
    <div className="main">
      <header id="main-header" className="header__main">
        <h2 className="header">
          Quiz Application
        </h2>
        <p className="subheader">
          Choose a category and test your knowledge
        </p>
      </header>
      <section id="category-section" className="category__main">
        <main id="code" className="programming-section">
          <span className="svg-wrapper"><FaCode /></span>
          <h3 className="section-title">Programming</h3>
          <p className="section-desc">Test your coding knowledge</p>
           <Link to="/programming" className="start-btn">Start Quiz</Link>
        </main>
        <main id="science" className="science-section">
          <span className="svg-wrapper"><MdScience /></span>
          <h3 className="section-title">Science</h3>
          <p className="section-desc">Explore scientific concepts</p>
          <Link to="/science" className="start-btn">Start Quiz</Link>
        </main>
        <main id="history" className="history-section">
          <span className="svg-wrapper"><IoBookSharp /></span>
          <h3 className="section-title">History</h3>
          <p className="section-desc">Journey through time</p>
           <Link to="/history" className="start-btn">Start Quiz</Link>
        </main>
        <main id="math" className="anime-section">
          <span className="svg-wrapper"><SiCrunchyroll /></span>
          <h3 className="section-title">Anime</h3>
          <p className="section-desc">Think you know anime?</p>
          <Link to="/anime" className="start-btn">Start Quiz</Link>
        </main>
      </section>
    </div>
  );
}

export default MainScreen;
