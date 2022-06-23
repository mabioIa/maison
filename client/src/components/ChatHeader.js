import React from 'react'

const ChatHeader = () => {
  return (
    <div className="chat-container-header">
      <div className="profile">
        <div className="image-container">
          <img src="" alt="" />
        </div>
        <h3>Username</h3>
      </div>
      <i className="logout-icon">x</i>
    </div>
  )
}

export default ChatHeader