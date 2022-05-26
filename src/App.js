import "./App.css";
import { statement } from "./statement";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useRef, useEffect } from "react";

function App() {
  const outputRef = useRef(null);
  const testRef = useRef(null);
  
  const [messengerTime, setMessangerTime] = useState(3000); // in ms
  const [noOfMessenger, setNoOfMessenger] = useState(30);
  const [processData, setProcessData] = useState([{
    color: "",
    time: "",
    msg: ""
  }]);
  const [inputData, setInputData] = useState(1);
  const [disableBtn, setDisableBtn] = useState(false);
  const [timeDiff, setTimeDiff] = useState(0);
  const [probabilityA, setProabilityA] = useState(0);
  const [probabilityB, setProabilityB] = useState(0);
  let processRunning = false;
  const scrollToBottom = () => {
    outputRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  const getCurrentTime = () => (new Date().getHours()) + ":" + (new Date().getMinutes()) + ":" + (new Date().getSeconds()) + ":" + new Date().getMilliseconds();
  useEffect(() => {
    scrollToBottom()
  }, [processData]);

  const numberRegex = /^[0-9\b]+$/; // number only
  let messengerCount;
  let interval; let isKilled1;
  let timer; let isKilled2;
  let startTime; let endTime;
  const startProcess = () => {
    setTimeDiff(0);
    setProabilityA(0);
    setProabilityB(0);
    setDisableBtn(true);
    setProcessData([]);
    if(inputData === 1){
      processRunning = true;
      messengerCount = 0; // reset messenger count
      startTime = new Date();
      setProcessData(processData => ([...processData, {color:"text-black", time:`${getCurrentTime()}`, msg:`Start`}]))
      interval = setInterval(() => {
        sendingMessageTimeInterval();
      }, messengerTime);
    }
    else if(inputData === 2){
      processRunning = true;
      sendingMessageBulkMessenger();
    }
    else{
      processRunning = true;
      startTime = new Date();
      setProcessData(processData => ([...processData, {color:"text-black", time:`${getCurrentTime()}`, msg:`Start`}]))
      interval = setInterval(() => {
        combineBoth();
      }, messengerTime);
    }
  }

  const sendingMessageTimeInterval = () => {
    messengerCount++;
    setProcessData(processData => ([...processData, {color:"text-black", time:`${getCurrentTime()}`, msg:`Messenger ${messengerCount} starts from General A`}]))
    isKilled1 = Math.random() < 0.5;
    if(isKilled1){
      setProcessData(processData => ([...processData, {color:"text-red-500", time:`${getCurrentTime()}`, msg:`Messenger ${messengerCount} killed on the path of General B`}]))
    }
    else{
      clearTimeout(timer);
      setProcessData(processData => ([...processData, {color:"text-green-500", time:`${getCurrentTime()}`, msg:`Messenger ${messengerCount} reached General B`}]))
      setProcessData(processData => ([...processData, {color:"text-black", time:`${getCurrentTime()}`, msg:`General B got the date and time of attack and acknowledge that`}]))
      setProcessData(processData => ([...processData, {color:"text-black", time:`${getCurrentTime()}`, msg:`Messenger ${messengerCount} starts from General B`}]))
      setProcessData(processData => ([...processData, {color:"text-black", time:`${getCurrentTime()}`, msg:`General B waiting for ${messengerTime * 2 / 1000} sec to arrive another messenger from General A`}]))
      
      timer = setTimeout(() => {
        setProcessData(processData => ([...processData, {color:"text-black", time:`${getCurrentTime()}`, msg:`General B assumes Messenger ${messengerCount} reached General A and preparing for attack`}]))
        setProcessData(processData => ([...processData, {color:"text-black", time:`${getCurrentTime()}`, msg:`End`}]));
        if(!processRunning) {
          endTime = new Date();
          setTimeDiff(Math.round(endTime - startTime)); //in ms
        }
      }, messengerTime * 2)

      isKilled2 = Math.random() < 0.5;
      if(isKilled2){
        setProcessData(processData => ([...processData, {color:"text-red-500", time:`${getCurrentTime()}`, msg:`Messenger ${messengerCount} killed on the path of General A`}]))
      }
      else{
        setProcessData(processData => ([...processData, {color:"text-green-500", time:`${getCurrentTime()}`, msg:`Messenger ${messengerCount} reached General A with General B acknowldgement and preparing for attack`}]))
        clearInterval(interval); // stop sending another messenger
        interval = 0;
        setDisableBtn(false);
        processRunning = false;
      }
    }
  }

  const sendingMessageBulkMessenger = () => {
    let aliveMessengers;
    setProcessData(processData => ([...processData, {color:"text-black", time:`${getCurrentTime()}`, msg:`Start`}]))
    setProcessData(processData => ([...processData, {color:"text-black", time:`${getCurrentTime()}`, msg:`${noOfMessenger} messengers starts from General A`}]))

    let killedMessengers1 = generateRandom(1, noOfMessenger + 1);
    setProcessData(processData => ([...processData, {color:"text-red-500", time:`${getCurrentTime()}`, msg:`${killedMessengers1} messengers killed on the path of General B`}]))

    aliveMessengers = noOfMessenger - killedMessengers1;
    setProabilityA((aliveMessengers / noOfMessenger) * 100);// probability A

    if(!aliveMessengers) {
      setProcessData(processData => ([...processData, {color:"text-red-500", time:`${getCurrentTime()}`, msg:`Process failed. No on alive`}]));
      processRunning = false;
      return false;
    }
    setProcessData(processData => ([...processData, {color:"text-green-500", time:`${getCurrentTime()}`, msg:`${aliveMessengers} messengers reached General B`}]));
    setProcessData(processData => ([...processData, {color:"text-black", time:`${getCurrentTime()}`, msg:`General B got the date and time of attack and acknowledge that`}]));

    let addedMessengers = noOfMessenger - aliveMessengers // find killed messengers count
    setProcessData(processData => ([...processData, {color:"text-black", time:`${getCurrentTime()}`, msg:`${aliveMessengers + addedMessengers} starts from General B`}]));
    setProcessData(processData => ([...processData, {color:"text-black", time:`${getCurrentTime()}`, msg:`General B assumes one of the ${aliveMessengers + addedMessengers} messengers reached General A, so he starts preparing for attack`}]));
    
    let killedMessengers2 = generateRandom(1, noOfMessenger + 1); // find killed messengers count;
    setProabilityB(((noOfMessenger - killedMessengers2) / noOfMessenger) * 100);// probability B
    setProcessData(processData => ([...processData, {color:"text-red-500", time:`${getCurrentTime()}`, msg:`${killedMessengers2} messengers killed on the path of General A`}]));
    if(aliveMessengers + addedMessengers - killedMessengers2 === 0) {
      setProcessData(processData => ([...processData, {color:"text-red-500", time:`${getCurrentTime()}`, msg:`Process failed. No on alive`}]));
      processRunning = false;
      return false;
    }
    setProcessData(processData => ([...processData, {color:"text-green-500", time:`${getCurrentTime()}`, msg:`${aliveMessengers + addedMessengers - killedMessengers2} messengers reached General A and starts preparing for attack`}]));
    setProcessData(processData => ([...processData, {color:"text-black", time:`${getCurrentTime()}`, msg:`End`}]));
    setDisableBtn(false);
    processRunning = false;
  }

  const combineBoth = () => {
    let aliveMessengers;
    setProcessData(processData => ([...processData, {color:"text-black", time:`${getCurrentTime()}`, msg:`${noOfMessenger} messengers starts from General A`}]));

    let killedMessengers1 = generateRandom(1, noOfMessenger + 1);
    setProcessData(processData => ([...processData, {color:"text-red-500", time:`${getCurrentTime()}`, msg:`${killedMessengers1} messengers killed on the path of General B`}]));

    aliveMessengers = noOfMessenger - killedMessengers1;
    if(!aliveMessengers) {
      setProcessData(processData => ([...processData, {color:"text-red-500", time:`${getCurrentTime()}`, msg:`All messengers were killed on path of General B`}]));
    }
    
    else{
      setProabilityA((aliveMessengers / noOfMessenger) * 100);// probability A
      clearTimeout(timer);
      setProcessData(processData => ([...processData, {color:"text-green-500", time:`${getCurrentTime()}`, msg:`${aliveMessengers} messengers reached General B`}]));
      setProcessData(processData => ([...processData, {color:"text-black", time:`${getCurrentTime()}`, msg:`General B got the date and time of attack and acknowledge that`}]));
      
      let addedMessengers = noOfMessenger - aliveMessengers // find killed messengers count
      setProcessData(processData => ([...processData, {color:"text-black", time:`${getCurrentTime()}`, msg:`${aliveMessengers + addedMessengers} starts from General B`}]));

      timer = setTimeout(() => {
        setProcessData(processData => ([...processData, {color:"text-black", time:`${getCurrentTime()}`, msg:`General B assumes one of the ${aliveMessengers + addedMessengers} Messengers reached General A and preparing for attack`}]));
        setProcessData(processData => ([...processData, {color:"text-black", time:`${getCurrentTime()}`, msg:`End`}]));
        if(!processRunning) {
          setProabilityB((aliveMessengers2 / noOfMessenger) * 100);// probability B
          endTime = new Date();
          setTimeDiff(Math.round(endTime - startTime)); //in ms
        }
      }, messengerTime);

      let killedMessengers2 = generateRandom(1, noOfMessenger + 1); // find killed messengers count
      setProcessData(processData => ([...processData, {color:"text-red-500", time:`${getCurrentTime()}`, msg:`${killedMessengers2} messengers killed on the path of General A`}]));

      let aliveMessengers2 = aliveMessengers + addedMessengers - killedMessengers2;
      if(!aliveMessengers2){
        setProcessData(processData => ([...processData, {color:"text-red-500", time:`${getCurrentTime()}`, msg:`All messengers were killed on path of General A`}]));
      }
      else{
        setProcessData(processData => ([...processData, {color:"text-green-500", time:`${getCurrentTime()}`, msg:`${aliveMessengers2} messengers reached General A and starts preparing for attack`}]));
        clearInterval(interval);
        interval = 0;
        setDisableBtn(false);
        processRunning = false;
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
              <h2 className="text-2xl font-semibold text-cyanBlue mb-3">Option</h2>
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
                  <span className="text-left text-xl  font-medium ml-2">{"A. send messenger with time interval"}</span>
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
                <h2 className="text-2xl font-semibold text-cyanBlue mb-3">Log</h2>
                <div>
                  <button
                   className={`text-white px-4 py-2 rounded mr-5 ${findBtnColor()? disableBtn? 'bg-gray pointer-events-none' :'bg-primary': 'bg-gray pointer-events-none'}`}
                   onClick={startProcess}
                  >
                    Start
                  </button>
                  <button
                   className={`bg-secondary text-white px-4 py-2 rounded mr-5`}
                   onClick={() => {
                    setProcessData([]);
                    setTimeDiff(0);
                    setProabilityA(0);
                    setProabilityB(0);
                   }}
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="output-container border rounded rounded-r-none border-primary h-52 overflow-auto px-4 py-2 font-mono">
                {processData?.map((print, index) => print.msg && <p ref={processData.length-1 === index? outputRef: testRef} key={index} className={print.color}><span> {print.time}: </span>  {print.msg} </p>)}
              </div>
            </div>
            {!!timeDiff || !!probabilityA || !!probabilityB? <div className="output-div text-left my-5">
              <h2 className="text-2xl font-semibold text-cyanBlue mb-3">Result</h2>
                {timeDiff > 0 && <p>Total time taken(ms): <span className="text-primary"> {timeDiff} </span></p>}
                {probabilityA > 0 && <p>Probability of sending messengers from A to B: {probabilityA.toFixed(2)} %</p>}
                {probabilityB > 0 && <p>Probability of sending messengers from B to A: {probabilityB.toFixed(2)} %</p>}
            </div>
            :
            ""
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
