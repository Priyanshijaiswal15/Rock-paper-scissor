import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [tieScore, setTieScore] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chances, setChances] = useState(11);

  const choices = ["rock", "paper", "scissor"];

  const handleClick = (choice) => {
    setUserChoice(choice);

    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);

    determineWinner(choice, randomChoice);
  };

  const determineWinner = (user, computer) => {
    // getChances();
    if (user === computer) {
      setTieScore(tieScore+1);
      setResult("It's a tie!");
    } else if (
      (user === "rock" && computer === "scissor") ||
      (user === "scissor" && computer === "paper") ||
      (user === "paper" && computer === "rock")
    ) {
      setResult("You win!");
      setUserScore(userScore + 1);
    } else {
      setResult("Computer wins!");
      setComputerScore(computerScore + 1);
    }
  };

  const resetScore = () => {
    setUserScore(0);
    setComputerScore(0);
    setUserChoice("None");
    setComputerChoice("None");
    setResult("");
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const root = document.body;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="app">
      {/* Theme Toggle Slider */}
      <div className="theme-toggle" onClick={toggleTheme}>
        <div className={`theme-toggle-circle ${isDarkMode ? "dark" : "light"}`}>
          {isDarkMode ? "🌙" : "☀️"}
        </div>
      </div>

      {/* Main Game */}
      <div className="game-container">
        <h1>Rock Paper Scissors</h1>
        <div className="choices-container">
          {choices.map((choice) => (
            <img
              key={choice}
              src={`/${choice}.png`}
              alt={choice}
              className="choice-img"
              onClick={() => handleClick(choice)}
            />
          ))}
        </div>

        <h3>
          User Score: {userScore}, Computer Score: {computerScore}
        </h3>
        <button onClick={resetScore} style={{backgroundColor: "pink", border: "1px solid black"}}>Reset Score</button>
        {/* <button >New Game</button> */}

        <div className="result-container">
          <h3>Your Choice: {userChoice || "None"}</h3>
          <h3>Computer's Choice: {computerChoice || "None"}</h3>
          <h2>{result}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
