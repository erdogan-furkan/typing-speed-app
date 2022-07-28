import "./App.css";
import Header from "./components/Header";
import WordBox from "./components/WordBox";
import Form from "./components/Form";
import Result from "./components/Result";
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";

function App() {
  const loading = useSelector((state) => state.words.loading);

  return (
    <div className="App select-none">
      <div className="container">
        <Header />
        {loading ? <Spinner color="fill-gray-600" /> : null}
        <WordBox invisible={loading} />
        {!loading && (
          <>
            <Form />
            <Result />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
