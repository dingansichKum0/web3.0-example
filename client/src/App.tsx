import "./App.css";
import { useEthers } from "./ethers";

function App() {
  const { value, say, listen, loading } = useEthers();

  return (
    <div className="App">
      <div>
        <span style={{ marginRight: 10 }}>{value}</span>
        <button onClick={say}>say</button>
      </div>

      <div>{loading && "..."}</div>

      <input
        name=""
        type="text"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            listen(e.target.value);
          }
        }}
      />
    </div>
  );
}

export default App;
