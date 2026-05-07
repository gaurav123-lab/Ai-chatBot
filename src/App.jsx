// App.jsx

import { useState } from "react";
import "./App.css";
import { URL } from "./Constants";
import Anser from "./component/Anser";

function App() {
  const [question, setquestion] = useState("");
  const [result, setresult] = useState([]);

  async function askquestion() {
    if (!question.trim()) return;

    const paybody = {
      contents: [
        {
          parts: [
            {
              text: question,
            },
          ],
        },
      ],
    };

    try {
      let response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paybody),
      });

      response = await response.json();

      console.log(response);

      if (response.candidates) {
        let dataString = response.candidates[0].content.parts[0].text;

        dataString = dataString
          .split("* ")
          .map((item) => item.trim())
          .filter((item) => item !== "");

        setresult((prev) => [
          ...prev,
          {
            type: "q",
            text: question,
          },
          {
            type: "a",
            text: dataString,
            question: question,
          },
        ]);
      } else {
        setresult((prev) => [
          ...prev,
          {
            type: "a",
            text: [response.error.message],
          },
        ]);
      }

      setquestion("");
    } catch (error) {
      console.log(error);

      setresult((prev) => [
        ...prev,
        {
          type: "a",
          text: ["Something went wrong"],
        },
      ]);
    }
  }

  function deleteRecent(questionText) {
    const updated = result.filter((item) => {
      if (item.type === "q" && item.text === questionText) {
        return false;
      }

      if (item.type === "a" && item.question === questionText) {
        return false;
      }

      return true;
    });

    setresult(updated);
  }

  return (
    <div className="grid grid-cols-5 h-screen bg-black">
      {/* SIDEBAR */}
      <div className="col-span-1 bg-zinc-900 text-white p-5 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-5">Recent</h1>

        <ul>
          {result
            .filter((item) => item.type === "q")
            .map((item, index) => (
              <li
                key={index}
                className="bg-zinc-800 p-3 rounded-xl mb-3 flex justify-between items-center"
              >
                <span className="truncate">{item.text}</span>

                <button
                  onClick={() => deleteRecent(item.text)}
                  className="text-red-400 ml-3"
                >
                  ✕
                </button>
              </li>
            ))}
        </ul>
      </div>

      <div className="col-span-4 flex flex-col">
        <div className="flex-1 overflow-y-auto p-5 text-white">
          <ul>
            {result.map((item, index) => (
              <li key={index}>
                <Anser ans={item} />
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5">
          <div className="bg-zinc-800 border border-zinc-700 rounded-4xl flex items-center p-4">
            <input
              value={question}
              onChange={(e) => setquestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  askquestion();
                }
              }}
              type="text"
              placeholder="Ask me anything"
              className="bg-transparent outline-none w-full text-white"
            />

            <button onClick={askquestion} className="text-white ml-3">
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
