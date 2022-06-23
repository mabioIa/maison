import TinderCard from 'react-tinder-card'
import { useState } from 'react'
import ChatContainer from '../components/ChatContainer'

const Dashboard = () => {
  const characters = [
    {
      name: "last" // Last card, to be styled differently from the rest
      // Good idea to draw on inspiration from bumble here.
    },
    {
      name: '1043 Franklin St, Santa Monica, CA 90403',
      price: '$4,520,000 (3710 sqft)',
      url: 'https://images.pexels.com/photos/5502227/pexels-photo-5502227.jpeg'
    },
    {
      name: '1043 Franklin St, Santa Monica, CA 90403',
      price: '$4,520,000 (3710 sqft)',
      url: 'https://images.pexels.com/photos/5502227/pexels-photo-5502227.jpeg'
    },
    {
      name: '1043 Franklin St, Santa Monica, CA 90403',
      price: '$4,520,000 (3710 sqft)',
      url: 'https://images.pexels.com/photos/5502227/pexels-photo-5502227.jpeg'
    },
    {
      name: '1043 Franklin St, Santa Monica, CA 90403',
      price: '$4,520,000 (3710 sqft)',
      url: 'https://images.pexels.com/photos/5502227/pexels-photo-5502227.jpeg'
    },
    {
      name: '1043 Franklin St, Santa Monica, CA 90403',
      price: '$4,520,000 (3710 sqft)',
      url: 'https://images.pexels.com/photos/5502227/pexels-photo-5502227.jpeg'
    }
  ]

  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <div className="dashboard">
      <ChatContainer />
      <div className="swiper-container">
        <div className="card-container">
          {
            characters.map((character) =>
              <TinderCard
                className='swipe'
                key={character.name}
                onSwipe={(dir) => swiped(dir, character.name)}
                onCardLeftScreen={() => outOfFrame(character.name)}>
                <div
                  style={{ backgroundImage: 'url(' + character.url + ')' }}
                  className='card'>
                  <div className="card-info">
                    <h3>{character.name}</h3>
                    <h4>{character.price}</h4>
                  </div>
                </div>
              </TinderCard>
            )}
          <div className="swipe-info">
            {lastDirection ? <p>You swiped {lastDirection}</p> : <p></p>}
          </div>
        </div>
      </div>
    </div >
  )
}

export default Dashboard