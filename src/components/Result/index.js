import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/words/wordsSlice";
import CountDown from "../CountDown";

function Result() {
  const dispatch = useDispatch();
  const [key, setKey] = useState(0);
  const hit = useSelector((state) => state.words.hit);
  const finished = useSelector((state) => state.words.finished);
  const totalPassedWords = useSelector((state) =>
    state.words.wordList.filter((word) => word.status === "passed")
  ).length;
  const totalFailedWords = useSelector((state) =>
    state.words.wordList.filter((word) => word.status === "failed")
  ).length;

  const bottomRef = useRef(null);

  let accuracy = parseFloat(
    (totalPassedWords / (totalPassedWords + totalFailedWords)) * 100
  );

  accuracy = isNaN(accuracy) ? "0.00" : accuracy.toFixed(2);

  useEffect(() => {
    if (finished) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [finished]);

  return (
    <div className="flex flex-col items-center justify-center">
      <CountDown start={hit} key={key} />
      {finished && (
        <div
          className="flex flex-col items-center justify-center w-full my-5"
          ref={bottomRef}
        >
          <div className="w-full sm:w-2/3 lg:w-1/2">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-bold mb-2 text-left">Results</h2>

              <button
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5"
                onClick={() => {
                  setKey((p) => p + 1);
                  dispatch(reset());
                }}
              >
                Try again
              </button>
            </div>

            <ul className="text-sm font-semibold text-gray-900 bg-white rounded-lg border border-gray-200">
              <li className="py-2 px-4 rounded-t-lg border-b border-gray-200 flex justify-between">
                <span>Total corrects</span>
                <span className="text-green-600">{totalPassedWords}</span>
              </li>
              <li className="py-2 px-4  border-b border-gray-200  flex justify-between">
                <span>Total wrongs</span>
                <span className="text-red-600">{totalFailedWords}</span>
              </li>
              <li className="py-2 px-4  border-b border-gray-200  flex justify-between">
                <span>Accuracy</span>
                <span>{accuracy}%</span>
              </li>
              <li className="py-2 px-4 border-b border-gray-200 rounded-b-lg flex justify-between">
                <span>Total keystroke</span>
                <span>{hit}</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Result;
