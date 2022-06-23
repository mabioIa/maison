import React from 'react'
import logo from '../images/logo.png'
import whiteLogo from '../images/whiteLogo.png'

const Nav = ({ minimal, showModal, setShowModal, setIsSignUp }) => {
  const handleClick = () => {
    setShowModal(true)
    setIsSignUp(false)
  }

  const authToken = false
  return (
    <nav>
      <div className="logo-container">
        <img className='logo' src={minimal ? whiteLogo : logo} alt="" />
      </div>

      {
        !minimal && !authToken &&
        <button
          className='nav-button'
          onClick={handleClick}
          disabled={showModal}
        >Log in</button>
      }
    </nav>
  )
}

export default Nav