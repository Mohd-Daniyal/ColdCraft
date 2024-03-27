import React from "react";
import "./App.css";
import Form from "./components/Form";

function App() {
  return (
    <div className="App flex justify-center items-center flex-col">
      <h1 className="m-8 font-medium dark:text-white md:text-5xl lg:text-4xl">
        <span className="text-transparent font-extrabold bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          ColdCraft{" "}
        </span>
        - Your Personalized cold email writer
      </h1>
      <div className="w-full sm:w-auto md:w-4/5 xl:w-5/6 p-8 md:p-10 lg:p-14 rounded-lg bg-black">
        <div className="max-w-xl w-full mx-auto space-y-12">
          <div className="lg:text-left text-center">
            <div className="flex items-center justify-center">
              <div className="w-full">
                <Form />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
