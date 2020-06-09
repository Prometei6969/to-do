import React, { useState } from 'react'

const AddUserForm = props => {
  const initialFormState = { id: null, note: '', }
  const [user, setUser] = useState(initialFormState)

  const handleInputChange = event => {
    const { name, value } = event.currentTarget
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (!user.note) return

    // вызываем addUser из хука из App
    props.addUser(user)
    // обнуляем форму, с помощью setUser функции
    // которая у нас взята из хука в данном компоненте [1]
    setUser(initialFormState)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div id = "input-block">
        <input
          
          id = "add-input"
          type="text"
          name="note"
          value={user.note}
          onChange={handleInputChange}
        />
        <button id="add-btn">Add new note</button>
      </div>
    </form>
  )
}

export { AddUserForm }