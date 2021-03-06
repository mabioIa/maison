import TinderCard from "react-tinder-card";
import { useState, useEffect } from "react";
import ChatContainer from "../components/ChatContainer";
import Zillow from "../components/Zillow";

const Dashboard = () => {
  const characters = [{}];
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <div className="dashboard">
      <ChatContainer />
      <div className="swiper-container">
        <div className="card-container">
          {characters.map((character) => (
            <TinderCard
              className="swipe"
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={() => outOfFrame(character.name)}
            >
              <div
                style={{ backgroundImage: "url(" + Zillow() + ")" }}
                className="card"
              >
                <div className="card-info">
                  <h3>{character.name}</h3>
                  <h4>{character.price}</h4>
                </div>
              </div>
            </TinderCard>
          ))}
          <div className="swipe-info">
            {lastDirection ? <p>You swiped {lastDirection}</p> : <p></p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
