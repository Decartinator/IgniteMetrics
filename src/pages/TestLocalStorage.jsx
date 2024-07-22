import React, { useState, useEffect } from "react";

const TestLocalStorage = () => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const savedValue = localStorage.getItem("testValue");
    if (savedValue) {
      setValue(savedValue);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("testValue", "Hello World");
    setValue("Hello World");
  };

  return (
    <div>
      <button onClick={handleSave}>Save to Local Storage</button>
      <p>Stored Value: {value}</p>
    </div>
  );
};

export default TestLocalStorage;
