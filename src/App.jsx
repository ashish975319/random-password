import React, { useState, useCallback } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "123456789";
    if (characterAllowed) str += "!@#$%^&*-_+=[]{}~'";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(password)
      .then(() => alert("Password copied to clipboard"))
      .catch((err) => console.error("Could not copy password: ", err));
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
      <h1 className="text-4xl text-white text-center my-3 p-4">
        Password Generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
        />
        <button
          className="outline-none bg-blue-800 text-white px-3 py-0.5"
          onClick={copyToClipboard}
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(parseInt(e.target.value));
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput"> Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={characterAllowed}
            id="characterInput"
            onChange={() => {
              setCharacterAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput"> Characters</label>
        </div>
      </div>
      <div className="flex justify-center mt-4 mb-2">
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          onClick={passwordGenerator}
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
