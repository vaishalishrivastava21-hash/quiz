
import React, { useEffect, useState } from "react";
import axios from "axios";
import './quiz.css';

export function Quiz() {
  const [quizData, setQuizData] = useState([]);
  const [count, setCount] = useState(0); //count is used to keep track of number of question
  const [score, setScore] = useState(0); //score store score for quiz
  const [result ,setResult]= useState("");
  const [suggest, setSuggest]= useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(0); 

  useEffect(() => {
    document.body.style.backgroundColor = "rgb(243, 241, 245)";
    axios
      .get("/quiz.json")
      .then((response) => {
        setQuizData(response.data);
      })
      .catch((error) => {
        console.error("Error loading JSON", error);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
  }
  function resultHandle(score){
     
    if (score <= 10) {  setResult(" You're calm and centered.");setSuggest([
      "🌼 Keep doing whatever you're doing — it's working!",
      "☕ Maybe journal a little? It keeps the vibe soft.",
      "📖Stay connected with activities that keep you grounded.",
    ]);
     }
  else if (score <= 20)  {setResult(" You're slightly stressed. Try mindful breaks.");
    setSuggest([
      "🧘‍♂️ 30-second breathing reset — try it now!",
      "📱 Put your phone down for 5 mins .",
      "🚶‍♀️ Walk a few steps or stretch your neck.",
    ]);
  }
  else if (score <= 30)  {setResult(" Moderate stress detected. Take time to unwind.");
    setSuggest([
      "🤗 You need a small mental hug.",
      "💆‍♀️ Try 5 deep breaths — inhale… exhale…",
      "📵 Take a mini break from screens.",
      "Identify one thing that's overwhelming you and break it into smaller tasks.",
    ]);
  }
  else  {setResult(" High stress! You need rest, support, and care.");
    setSuggest([
      "🚨 You need immediate rest — nothing else matters!",
      "🛏 Go lie down for 10 minutes and breathe slowly.",
      "📞 Talk to someone comforting if you feel overwhelmed.",
      "😴Prioritize rest — your body and mind need recovery.",
    ]);
  }
  }

  function handleOptionSelect(weight, value) {
    setSelectedOption(value);
    setSelectedWeight(weight); 
  }

  function nextQuestion() {
    setScore((prev) => prev + selectedWeight); 
    setCount((prev) => prev + 1);
    setSelectedOption(null);
    setSelectedWeight(0);
  }

  function resetQuiz() {
    setCount(0);
    setScore(0);
    setSelectedOption(null);
    setSelectedWeight(0);
  }
if (quizData.length > 0 && count >= quizData.length && result === "") {
  resultHandle(score); //storing final score of quiz
}
  return (
    <div className="container">
      {quizData.length > count ? (
        <div className="Questioncard">
          <h2>{quizData[count].question}</h2>
          <form onSubmit={handleSubmit}>
            <div className="options">
              {quizData[count].options.map((o, i) => (
                <label key={i} className="option">
                  <input
                    type="radio"
                    name={`question-${count}`}
                    value={o.text}
                    checked={selectedOption === o.text}
                    onChange={() => handleOptionSelect(o.weight, o.text)} 
                  />
                  {o.text}
                </label>
              ))}
            </div> <div className="btnsection">
            <button className="resetbtn" onClick={resetQuiz}>RESET </button>
            <button
              className="nextbtn"
              onClick={nextQuestion}
              disabled={selectedOption === null}
            >
              NEXT
            </button></div>
            <p className="quote">🌻 Make your Mental Health a priority.</p>
          </form>
        </div>
      ) : 
      (<>
        <div className="suggestionbox"><div className="suggestion">
          Stress Level: {result}
          <ul className="result-list">
    {suggest.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
          </div>
          </div> <button className="resetbtn" onClick={resetQuiz}>RESET QUIZ</button></>
      )}
      
    </div>
  );
}
