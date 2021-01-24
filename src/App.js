import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Rankings from "./components/Rankings";
import About from "./components/About";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import zuckArray from "./components/ArrayOfZucks";

import "./App.css";

function App() {
  //We initialize the images array from the hard coded array.
  const [zArray, setZArray] = useState([...zuckArray]);

  //We get the array from a local storage (if there is an array)
  useEffect(() => {
    const data = localStorage.getItem("zArray");
    if (data) {
      setZArray(JSON.parse(data));
    }
  }, []);

  //Every time the images change (or at first render), we upload the images array to the local storage.
  useEffect(() => {
    localStorage.setItem("zArray", JSON.stringify(zArray));
  }, [zArray]);

  //Gets the index of the clicked image and adds point to the object.
  const addPoint = (targetIndex) => {
    let tempZArray1 = [...zArray];
    let tempZArray2 = tempZArray1.map((object) => {
      if (object.id === tempZArray1[targetIndex].id) {
        object.points = object.points + 1;
        return object;
      } else {
        return object;
      }
    });

    setZArray(tempZArray2);
  };

  // For Menu.js Initiate the state for the selected buttons to change it later with an on click funtion
  const [randomBtn, setRandomBtn] = useState(true);
  const [funBtn, setFunBtn] = useState(false);
  const [casualBtn, setCasualBtn] = useState(false);
  const [congressBtn, setCongressBtn] = useState(false);
  const [smileBtn, setSmileBtn] = useState(false);

  //Object to pass props more effectively.
  const btnObject = {
    randomBtn,
    funBtn,
    casualBtn,
    congressBtn,
    smileBtn,
  };

  //Changes the state of the buttons in Menu
  const toggleBtn = (e) => {
    //First we set all the buttons to off
    setRandomBtn((prev) => (prev = false));
    setFunBtn((prev) => (prev = false));
    setCasualBtn((prev) => (prev = false));
    setCongressBtn((prev) => (prev = false));
    setSmileBtn((prev) => (prev = false));
    //Then we check the id of the btn we are pressing.
    const targetKey = e.target.getAttribute("id");

    //We use the id to know wich btn we need to change the state of.
    if (targetKey === "random") {
      setRandomBtn((prev) => true);
    } else if (targetKey === "fun") {
      setFunBtn((prev) => true);
    } else if (targetKey === "casual") {
      setCasualBtn((prev) => true);
    } else if (targetKey === "congress") {
      setCongressBtn((prev) => true);
    } else if (targetKey === "smile") {
      setSmileBtn((prev) => true);
    }
  };

  //Initiate state for the array going to be used to pick photos from on Choosezucks.js depending on btn tags in Menu.js

  const [currentZArray, setCurrentZArray] = useState([zArray]);

  //To determine which Array to pass as a prop depending of what tag btn is active

  useEffect(() => {
    if (funBtn) {
      setCurrentZArray(
        (prev) =>
          (prev = zArray.filter((object) => object.tags.includes("fun")))
      );
    } else if (casualBtn) {
      setCurrentZArray(
        (prev) =>
          (prev = zArray.filter((object) => object.tags.includes("casual")))
      );
    } else if (congressBtn) {
      setCurrentZArray(
        (prev) =>
          (prev = zArray.filter((object) => object.tags.includes("congress")))
      );
    } else if (smileBtn) {
      setCurrentZArray(
        (prev) =>
          (prev = zArray.filter((object) => object.tags.includes("casual")))
      );
    } else if (randomBtn) {
      setCurrentZArray((prev) => (prev = zArray));
    }
  }, [funBtn, casualBtn, congressBtn, smileBtn, randomBtn, zArray]);

  //Set up the array to store the history of images with an object with two images diferent from each other.
  const [indexHistory, setIndexHistory] = useState(() => {
    let zObjLeftIndex;
    let zObjRightIndex;

    do {
      zObjLeftIndex = Math.floor(Math.random() * zArray.length);
      zObjRightIndex = Math.floor(Math.random() * zArray.length);
    } while (zObjLeftIndex === zObjRightIndex);

    return [
      {
        zuckObjLeft: zArray[zObjLeftIndex],
        zuckObjRight: zArray[zObjRightIndex],
      },
    ];
  });
  //The images being displayed right now
  const currentImgs = indexHistory[indexHistory.length - 1];

  console.log(indexHistory);

  function randomIndexs() {
    const currentZArray2 = [...currentZArray];
    const currentImgs2 = { ...currentImgs };
    //Gives me the index of two objects from the current array.
    let zObjLeftIndex = Math.floor(Math.random() * currentZArray2.length);
    let zObjRightIndex = Math.floor(Math.random() * currentZArray2.length);
    //Find those objects on the original Array
    const zArrayLeft = currentZArray2[zObjLeftIndex];
    const zArrayRight = currentZArray2[zObjRightIndex];

    //compare the ids so the new pictures are not the same as the previous ones or than each other
    if (
      zArrayLeft.id !== zArrayRight.id &&
      zArrayLeft.id !== currentImgs2.zuckObjLeft.id &&
      zArrayLeft.id !== currentImgs2.zuckObjRight.id &&
      zArrayRight.id !== currentImgs2.zuckObjLeft.id &&
      zArrayRight.id !== currentImgs2.zuckObjRight.id
    ) {
      const zObjIndexs = {
        zObjLeftIndex: zArrayLeft.id - 1,
        zObjRightIndex: zArrayRight.id - 1,
      };
      return zObjIndexs;
    } else {
      return randomIndexs();
    }
  }

  //We change the pics by finding the index of the photos and we push them to the history.
  function changePics() {
    const newRandomIndexs = randomIndexs();

    const objLeftIndex = zArray[newRandomIndexs.zObjLeftIndex].id - 1;
    const objRightIndex = zArray[newRandomIndexs.zObjRightIndex].id - 1;

    const newZuckObject = {
      zuckObjLeft: zArray[objLeftIndex],
      zuckObjRight: zArray[objRightIndex],
    };

    const historyCopy = [...indexHistory];
    historyCopy.push(newZuckObject);

    setIndexHistory(historyCopy);
  }

  //For when you click the images in ChooseZucks.js
  function handleClick(e) {
    let targetIndex = e.target.getAttribute("zuckid") - 1;
    addPoint(targetIndex);
    changePics();
  }

  //To go back to the previous image.
  function previous() {
    const indexHistoryCopy = [...indexHistory];
    indexHistoryCopy.splice(-1, 1);
    setIndexHistory((prev) => (prev = indexHistoryCopy));
  }

  return (
    <Router>
      <div className="div-App">
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <Main
                {...props}
                toggleBtn={toggleBtn}
                addPoint={addPoint}
                btnObject={btnObject}
                currentImgs={currentImgs}
                handleClick={handleClick}
                previous={previous}
                indexHistory={indexHistory}
              />
            )}
          />
          <Route
            path="/Rankings"
            exact
            render={(props) => <Rankings {...props} zArray={zArray} />}
          />
          <Route path="/About" exact component={About} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
