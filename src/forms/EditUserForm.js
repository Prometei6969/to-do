import React, { useState, useEffect } from 'react'

const EditUserForm = props => {
  const [user, setUser] = useState(props.currentUser)

  // используем effect-hook
  useEffect(
    () => {
      // вызывай данную функцию
      setUser(props.currentUser)
    },
    [props] // всегда, если изменились props
  )

  const handleInputChange = event => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (!user.note) return

    props.updateUser(user.id, user)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div id="input-block">
        <input
          id = "ed-input"
          type="text"
          name="note"
          value={user.note}
          onChange={handleInputChange}
        />
        <button id="ed-btn">Update</button>
        <button
          onClick={() => props.setEditing(false)}
          id="can-btn"
        >
          Cancel
      </button>
      </div>
    </form>
  )
}

export { EditUserForm } 