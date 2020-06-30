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

  const list = JSON.parse(localStorage.getItem("list"));


  return (
    <div id="list">
      <ul className="todos">
        {list.length > 0 ? (
          list.map(user => (
            <li key={user.id}>
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