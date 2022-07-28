import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { check } from "../../redux/words/wordsSlice";

function Form() {
  const dispatch = useDispatch();
  const finished = useSelector((state) => state.words.finished);
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.code === "Space") {
      if (input && input !== "") {
        dispatch(check({ input, next: true }));
        setInput("");
      }
    }
  };

  const handleChange = ({ target }) => {
    setInput(target.value.trim());
  };

  useEffect(() => {
    if (input && input !== "") {
      dispatch(check({ input }));
    }
  }, [input, dispatch]);

  return (
    <div className="my-6">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
          finished && "cursor-not-allowed"
        }`}
        disabled={finished}
      />
    </div>
  );
}

export default Form;
