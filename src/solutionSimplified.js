import "./App.css";
import { statement } from "./statement";
import { Helmet, HelmetProvider } from "react-helmet-async";
import HTMLReactParser from "html-react-parser";
import { useState } from "react";

function App() {

  const [messengerTime, setMessangerTime] = useState(3000); // in ms
  const [noOfMessenger, setNoOfMessenger] = useState(30);
  const [inputData, setInputData] = useState(1);
  const numberRegex = /^[0-9\b]+$/; // number only
  let interval; let isKilled1;
  let timer; let isKilled2;
  const startProcess = () => {
    if(inputData === 1){

      console.log(`Start`);

      interval = setInterval(() => {
        sendingMessageTimeInterval();
      }, messengerTime);
    }
    else if(inputData === 2){
      sendingMessageBulkMessenger();
    }
    else{
      console.log(`Process Start`);
      interval = setInterval(() => {
        combineBoth();
      }, messengerTime);
    }
  }

  const sendingMessageTimeInterval = () => {
    console.log(`Messenger starts from General A`);
      isKilled1 = Math.random() < 0.5;
      if(isKilled1){
        console.log(`Messenger killed on the path of General B`);
      }
      else{
        clearTimeout(timer);

        console.log(`Messenger reaches General B`);
        console.log(`General B got the date and time of attack and acknowledge that`);
        console.log(`Messenger starts from General B`);
        console.log(`General B waiting for ${messengerTime * 2 / 1000} sec to arrive another messenger from General A`);
        
        timer = setTimeout(() => {
          console.log(`General B assumes Messenger reached General A and preparing for attack`);
          console.log(`End of Process`);
        }, messengerTime * 2)

        isKilled2 = Math.random() < 0.5;
        if(isKilled2){
          console.log(`Messenger killed on the path of General A`);
        }
        else{
          console.log(`Messenger reaches General A with General B acknowldgement and preparing for attack`);
          clearInterval(interval); // stop sending anothr messenger
          interval = 0;
        }
      }
  }

  const sendingMessageBulkMessenger = () => {
    let aliveMessengers;
    console.log(`Process Start`);
    console.log(`${noOfMessenger} messengers starts from General A`);
    let killedMessengers1 = generateRandom(1, noOfMessenger + 1)
    console.log(`${killedMessengers1} messengers killed on the path of General B`);
    aliveMessengers = noOfMessenger - killedMessengers1;
    if(!aliveMessengers) {
      console.log(`Process failed. No on alive`);
      return false;
    }
    console.log(`${aliveMessengers} messengers reached General B`);
    console.log(`General B got the date and time of attack and acknowledge that`);
    let addedMessengers = noOfMessenger - aliveMessengers // find killed messengers count
    console.log(`${aliveMessengers + addedMessengers} starts from General B`);
    console.log(`General B assumes one of the ${aliveMessengers + addedMessengers} messengers reached General A, so he starts preparing for attack`);

    let killedMessengers2 = generateRandom(1, noOfMessenger + 1); // find killed messengers count
    console.log(`${killedMessengers2} messengers killed on the path of General A`);
    console.log(`${aliveMessengers + addedMessengers - killedMessengers2} messengers reached General A and starts preparing for attack`);
    console.log(`Process End`);
  }

  const combineBoth = () => {
    let aliveMessengers;
    console.log(`${noOfMessenger} messengers starts from General A`);
    let killedMessengers1 = generateRandom(1, noOfMessenger + 1)
    console.log(`${killedMessengers1} messengers killed on the path of General B`);
    aliveMessengers = noOfMessenger - killedMessengers1;

    if(!aliveMessengers) {
      console.log(`All messengers were killed on path of General B`);
    }
    
    else{
      clearTimeout(timer);
      console.log(`${aliveMessengers} messengers reached General B`);
      console.log(`General B got the date and time of attack and acknowledge that`);
      let addedMessengers = noOfMessenger - aliveMessengers // find killed messengers count
      console.log(`${aliveMessengers + addedMessengers} starts from General B`);
      timer = setTimeout(() => {
        console.log(`General B assumes one of the ${aliveMessengers + addedMessengers} Messengers reached General A and preparing for attack`);
        console.log(`End of Process`);
      }, messengerTime);

      let killedMessengers2 = generateRandom(1, noOfMessenger + 1); // find killed messengers count
      console.log(`${killedMessengers2} messengers killed on the path of General A`);
      let aliveMessengers2 = aliveMessengers + addedMessengers - killedMessengers2;
      if(!aliveMessengers2){
        console.log(`All messengers were killed on path of General A`);
      }
      else{
        console.log(`${aliveMessengers2} messengers reached General A and starts preparing for attack`);
        clearInterval(interval);
      }
    }
  }

  const generateRandom = (min, max) => {
    let rand = Math.random();
    rand = Math.floor(rand * (max - min)) + min;
    return rand;
  }

  const findBtnColor = () => {
    if(inputData === 1 && messengerTime) return true;
    else if(inputData === 2 && noOfMessenger) return true;
    else if(inputData === 3 && noOfMessenger && messengerTime) return true;
    else return false
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{`Two Generals Problem`}</title>
        </Helmet>
      </HelmetProvider>
      <div className="App">
        <div className=" p-5 overflow-hidden ">
          <div className="main border rounded border-gray-500 px-4">
            <div className="text-left mb-3 border-b border-gray-500">
              <h2 className="text-2xl font-semibold text-cyanBlue mb-3">Problem Statement</h2>
              <p className="text-base mb-2">{statement}</p>
              <p className="text-base font-medium mb-2">{`Create a machine comes up with an (almost) solution whenever the boundary conditions are slightly changed.`}</p>
            </div>
            <div className="boundary-conditions-div text-left border-b border-gray-500">
              <h2 className="text-2xl font-semibold text-cyanBlue mb-3">Boundary Conditions</h2>
              <div className="boundary-conditions-input flex justify-between mb-3">
                <div>
                  <span className="text-left text-xl text-grayDeep font-semibold mr-2">{"Total time to take messenger come back :"}</span>
                  <input 
                    type="text"
                    className={`text-lg border outline-none focus:border-primary px-2 font-medium border-gray ${inputData === 2 && 'text-gray'}`}
                    id="totalTime"
                    name="totalTime"
                    disabled = {inputData === 2}
                    onChange={(e) => {
                      if (e.target.value === '' || numberRegex.test(e.target.value)) {
                        setMessangerTime(e.target.value)
                      }
                    }}
                    value={messengerTime}
                    maxLength={5}
                  />
                  <span className="ml-2">ms</span>
                </div>
                <div className="">
                  <span className="text-left text-xl text-grayDeep font-semibold mr-2">{"No of Messengers initially to send:"}</span>
                  <input 
                    type="text"
                    className={`text-lg border outline-none focus:border-primary px-2 font-medium border-gray ${inputData === 1 && 'text-gray'}`}
                    disabled = {inputData === 1}
                    id="messengerCount"
                    name="messengerCount"
                    onChange={(e) => {
                      if (e.target.value === '' || numberRegex.test(e.target.value)) {
                        setNoOfMessenger(e.target.value);
                      }
                    }}
                    value={noOfMessenger}
                    maxLength={3}
                  />
                </div>
              </div>
            </div>
            <div className="input-div text-left border-b border-gray-500">
              <h2 className="text-2xl font-semibold text-cyanBlue mb-3">Inputs</h2>
              <div className="input flex justify-around mb-3">
                <div>
                  <input 
                    type="radio"
                    id="optionA"
                    name="inputData"
                    value = {1}
                    checked={inputData === 1}
                    onChange={(e) => {
                      setInputData(parseInt(e.target.value))
                    }}
                  />
                  <span className="text-left text-xl  font-medium ml-2">{"A. send messenger with time intervel"}</span>
                </div>
                <div>
                  <input 
                    type="radio"
                    id="optionB"
                    name="inputData"
                    value = {2}
                    checked={inputData === 2}
                    onChange={(e) => {
                      setInputData(parseInt(e.target.value))
                    }}
                  />
                  <span className="text-left text-xl font-medium ml-2">{"B. send bulk messengers"}</span>
                </div>
                <div>
                  <input 
                    type="radio"
                    id="optionC"
                    name="inputData"
                    value = {3}
                    checked={inputData === 3}
                    onChange={(e) => {
                      setInputData(parseInt(e.target.value))
                    }}
                  />
                  <span className="text-left text-xl font-medium ml-2">{"C. combine both A and B"}</span>
                </div>
              </div>
            </div>
            <div className="output-div text-left my-5">
              <div className="flex justify-between mb-3">
                <h2 className="text-2xl font-semibold text-cyanBlue mb-3">Output</h2>
                <div>
                  <button
                   className={`text-white px-4 py-2 rounded mr-5 ${findBtnColor()? 'bg-primary': 'bg-gray pointer-events-none'}`}
                   onClick={startProcess}
                  >
                    Start
                  </button>
                  <button
                   className={`bg-secondary text-white px-4 py-2 rounded mr-5`}
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="output-container border border-primary h-52 overflow-auto">
                  {HTMLReactParser()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
