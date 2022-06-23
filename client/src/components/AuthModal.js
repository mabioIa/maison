import React from 'react'
import { useState } from 'react';

const AuthModal = ({ setShowModal, isSignUp }) => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)

  const handleClick = () => {
    setShowModal(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      if (isSignUp && (password !== confirmPassword)) {
        setError("Passwords need to match");
      }

      console.log("Make a post request to our database");
    } catch (error) {
      console.log(error);
    }
  }


  console.log(email, password, confirmPassword)
  return (
    <div className='auth-modal'>
      <div className="close-icon" onClick={handleClick}>(x)</div>
      <h2>{isSignUp ? 'Create Account' : 'Log In'}</h2>
      <p>By {isSignUp ? 'creating an account' : 'logging in'}, you agree to our terms. Learn how we process your data in our Privacy Policy & Cookie Policy</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          required="true"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required="true"
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignUp && < input
          type="password"
          id="password-check"
          name="password-check"
          placeholder="confirm password"
          required="true"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />}
        <input className="secondary-button" type="submit" />
        <p class="error">{error}</p>
      </form>

      <hr />
      <h2>Get the App!</h2>
    </div>
  )
}

export default AuthModal 