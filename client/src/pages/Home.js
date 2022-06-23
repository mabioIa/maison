import Nav from '../components/Nav'
import AuthModal from '../components/AuthModal'

import { useState } from 'react'

const Home = () => {
  const [showModal, setShowModal] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)

  const handleClick = () => {
    console.log("Clicked")
    setIsSignUp(true)
    setShowModal(true)
  }

  const authToken = false
  return (
    <div className="overlay">
      <Nav
        minimal={false}
        setShowModal={setShowModal}
        setIsSignUp={setIsSignUp}
        showModal={showModal}
      />

      <div className="home">
        <h1 className="primary-title">Maison</h1>
        <button className="primary-button" onClick={handleClick}>
          {authToken ? 'Sign out' : 'Create Account'}
        </button>

        {
          showModal && (
            <AuthModal
              setShowModal={setShowModal}
              isSignUp={isSignUp}
            />)}
      </div>
    </div>

  )
}

export default Home