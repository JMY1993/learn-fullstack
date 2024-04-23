import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>    
  </tr>
);
const Statistic = ({ lines }) => {
  if (lines.some((line) => line.value > 0)) {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          {lines.map((line, key) => (
            <StatisticLine key={key} text={line.text} value={line.value} />
          ))}
          <tr>
            <td>all</td>
            <td>{lines.reduce((acc, line) => acc + line.value, 0)}</td>
          </tr>
          <td>average</td>
          <td>
            {(
              (lines.find((line) => line.text === "good").value -
                lines.find((line) => line.text === "bad").value) /
              lines.reduce((acc, line) => acc + line.value, 0)
            ).toFixed(1)}
          </td>
          <tr>
            <td>positive</td>
            <td>{`${(
              (lines.find((line) => line.text === "good").value /
                lines.reduce((acc, line) => acc + line.value, 0)) *
              100
            ).toFixed(1)} %`}</td>
          </tr>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const textLines = [
    { text: "good", value: good },
    { text: "neutral", value: neutral },
    { text: "bad", value: bad },
  ];

  const handleClick = (type) => {
    switch (type) {
      case "good":
        return () => setGood(good + 1);
      case "neutral":
        return () => setNeutral(neutral + 1);
      case "bad":
        return () => setBad(bad + 1);
      default:
        return () => {};
    }
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={handleClick("good")} text="good" />
      <Button onClick={handleClick("neutral")} text="neutral" />
      <Button onClick={handleClick("bad")} text="bad" />
      <Statistic lines={textLines} />
    </>
  );
};

export default App;
