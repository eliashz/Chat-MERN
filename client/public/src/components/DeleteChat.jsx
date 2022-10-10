import React from 'react'
import { Link } from 'react-router-dom'

const DeleteChat = ({ chatroom, onDelete }) => {
  return (
    <div className="chatroom">
        <Link to={'/chat/' + chatroom._id } name={ chatroom.name }><div className='chatName'>{ chatroom.name.toUpperCase() }</div></Link>
       <span id={ chatroom._id } onClick={ onDelete } className="join material-symbols-outlined">delete</span>
    </div>
  )
}

export default DeleteChat