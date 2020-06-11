import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck  } from "@fortawesome/free-solid-svg-icons";


const UserTable = props => {
  const handleDeleteUser = id => {
    let answer = window.confirm('Are you sure?')

    if (answer) {
      props.deleteUser(id)
      localStorage.removeItem(String(id))
    }
  }

  var clicked = false

  function handleClick(e) {
    e.preventDefault()
    clicked = true
  }

  
  var className = clicked ? 'checked' : '';

  return (
    <div id="list">
      <ul className="todos">
        {props.users.length > 0 ? (
          props.users.map(user => (
            <li key={user.id} onClick={handleClick} className={className} >
              <FontAwesomeIcon id = "icon-check" icon={ faCheck }/>
              <span>
                {user.note}
              </span>
              {/* добавили обработку на клик */}
              <div className = "note-buttons">
                <button className="buttons-li-del"
                  onClick={() => {
                    props.editRow(user)
                  }}
                >
                  Edit
                </button >
                <button className="buttons-li-ed"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </div>

            </li>
          ))
        ) : (
            <li>
              <span colSpan={3}>No notes</span>
            </li>
          )}
      </ul>
    </div>
  )
}

export { UserTable }