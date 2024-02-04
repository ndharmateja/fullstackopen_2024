import { useState } from "react";
import AnecdoteSection from "./components/AnecdoteSection";

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

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const incrementCurrentVote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  };

  const getMaxVotesIndex = () => {
    let maxIndex = 0;
    for (const i in votes) {
      if (votes[i] > votes[maxIndex]) maxIndex = i;
    }
    return maxIndex;
  };

  return (
    <div>
      <AnecdoteSection
        title="Anecdote of the day"
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
      />
      <button onClick={() => incrementCurrentVote()}>vote</button>
      <button onClick={() => setSelected((selected + 1) % anecdotes.length)}>
        next anecdote
      </button>
      <AnecdoteSection
        title="Anecdote with most votes"
        anecdote={anecdotes[getMaxVotesIndex()]}
        votes={votes[getMaxVotesIndex()]}
      />
    </div>
  );
};

export default App;
