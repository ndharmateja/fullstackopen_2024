import { useState } from "react";
import Button from "./components/Button";
import Display from "./components/Display";

const App = () => {
  const [counter, setCounter] = useState(0);

  const handleDecrement = () => setCounter(counter - 1);
  const handleReset = () => setCounter(0);
  const handleIncrement = () => setCounter(counter + 1);

  return (
    <div>
      <Display count={counter} />
      <Button title="minus" onClick={handleDecrement} />
      <Button title="zero" onClick={handleReset} />
      <Button title="plus" onClick={handleIncrement} />
    </div>
  );
};

export default App;
