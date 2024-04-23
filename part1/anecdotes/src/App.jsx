import { useState } from "react";

const Statistics = ({mostVoted, votes}) => {
  return (
    <>
      <h1>Anecdote with most votes</h1>
      {votes !== 0 ? (
        <>
          <p>{mostVoted}</p>
          <p>has {votes} votes</p>
        </>
      ) : (
        <p>
          Press vote to vote for current anecdote, press next anecdote to go
          next
        </p>
      )}
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const randomAnecdote = () => Math.floor(Math.random() * anecdotes.length);

  const [selected, setSelected] = useState(randomAnecdote());

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const voteCurrent = () => {
    const newPoints = [...points];
    newPoints[selected]++;
    setPoints(newPoints);
  };

  const nextRandomAnecdote = () => {
    let r;
    do {
      r = randomAnecdote();
    } while (r === selected);
    setSelected(r);
  };

  const getMostVotes = () => {
    return points.reduce(
      (max, c, i) => (max.value <= c ? { value: c, index: i } : max),
      { value: 0, index: 0 }
    );
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={voteCurrent}>vote</button>
      <button onClick={nextRandomAnecdote}>next anecdote</button>
      <Statistics mostVoted={anecdotes[getMostVotes().index]} votes={getMostVotes().value}></Statistics>
    </>
  );
};

export default App;
