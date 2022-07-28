import { useRef, useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../redux/words/wordsSlice";

const firstWords = [];

function WordBox({ invisible }) {
  const dispatch = useDispatch();
  const wordList = useSelector((state) => state.words.wordList);
  const index = useSelector((state) => state.words.index);
  const loading = useSelector((state) => state.words.loading);
  const [line, setLine] = useState(0);

  const ref = useRef(null);

  useEffect(() => {
    if (loading) {
      firstWords.length = 0;
      setLine(0);

      const clone = ref.current.cloneNode(true);
      clone.style.visibility = "hidden";
      ref.current.parentNode.appendChild(clone);
      const words = clone.textContent.split(" ");

      clone.innerHTML = words.shift();
      let height = clone.clientHeight;
      words.forEach((word, i) => {
        clone.innerHTML += `<span class="p-1">${word}</span> `;
        const newHeight = clone.clientHeight;
        if (newHeight > height) {
          height = newHeight;
          firstWords.push(word);
        }
      });

      ref.current.parentNode.removeChild(clone);

      setTimeout(() => {
        dispatch(setLoading());
      }, 1000);
    }
  }, [dispatch, loading]);

  useEffect(() => {
    if (wordList[index].name === firstWords[line]) {
      setLine(line + 1);
    }
  }, [index, wordList, line]);

  return (
    <div className={`border-2 p-4 rounded ${invisible ? "invisible" : null}`}>
      <div className="text-justify h-12 leading-6 overflow-hidden">
        <div
          className={`relative`}
          id="wordList"
          ref={ref}
          style={{ bottom: `${line * 1.5}rem` }}
        >
          {wordList.map((word, key) => (
            <Fragment key={key}>
              <span
                className={`p-1 ${
                  word.status === "current"
                    ? "bg-gray-200"
                    : word.status === "current-highlighted"
                    ? "bg-gray-200 text-red-600"
                    : word.status === "passed"
                    ? "text-green-600"
                    : word.status === "failed"
                    ? "text-red-600"
                    : null
                }`}
              >
                {word.name}
              </span>{" "}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WordBox;
