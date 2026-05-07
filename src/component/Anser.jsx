import React from "react";

function Anser({ ans }) {
  function renderMessage(text) {
    if (text.includes("```")) {
      const cleanCode = text
        .replace(/```javascript/g, "")
        .replace(/```js/g, "")
        .replace(/```/g, "");

      return (
        <pre className="bg-black p-4 rounded-xl overflow-x-auto my-2">
          <code className="text-green-400">{cleanCode}</code>
        </pre>
      );
    }

    // NORMAL TEXT
    return <p className="whitespace-pre-wrap break-words py-1">{text}</p>;
  }

  return (
    <div className="mb-4">
      {/* QUESTION */}
      {ans.type === "q" && (
        <div className="flex justify-end">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl max-w-[70%]">
            {ans.text}
          </div>
        </div>
      )}

      {ans.type === "a" && (
        <div className="flex justify-start">
          <div className="bg-zinc-800 text-white px-4 py-3 rounded-2xl max-w-[80%]">
            {ans.text.map((item, index) => (
              <div key={index}>{renderMessage(item)}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Anser;
