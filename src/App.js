import React, { useState } from 'react'
import { AddUserForm } from './forms/AddUserForm'
import { EditUserForm } from './forms/EditUserForm'
import { UserTable } from './tables/NoteTable'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from "@fortawesome/free-solid-svg-icons";


const App = () => {


  const usersData = [
    { id: Math.random(), note: 'Go to the training' },
    { id: Math.random(), note: 'Walking with the dog' },
  ]

  const rnd = Math.random()
  
  let LocalNote = { id: rnd, note: localStorage.getItem(String(rnd))}
  usersData.push(LocalNote)
  

  const [users, setUsers] = useState(usersData)
  // флаг editing - изначально false, функция установки флага
  const [editing, setEditing] = useState(false)
  // начальное значение для формы редактирования
  // так как мы не знаем, кто редактируется - пустые поля
  const initialFormState = { id: null, note: '' }
  // значение "текущий пользователь на редактировании" + функция установки этого значения
  const [currentUser, setCurrentUser] = useState(initialFormState)


  const addUser = user => {
    user.id = rnd
    setUsers([...users, user])
  }

  const deleteUser = id => {
    setEditing(false)
    setUsers(users.filter(user => user.id !== id))
  }

  // обновление пользователя
  const updateUser = (id, updatedUser) => {
    // когда мы готовы обновить пользователя, ставим флажок editing в false
    setEditing(false)
    // и обновляем пользователя, если нашли его по id
    setUsers(users.map(user => (user.id === id ? updatedUser : user)))
  }

  // редактирование пользователя
  const editRow = user => {
    // готовы редактировать - флажок в true
    setEditing(true)
    // устанавливаем значения полей для формы редактирования
    // на основании выбранного "юзера"
    setCurrentUser({ id: user.id, note: user.note })
  }

  return (

    <div id="todo">
      <h1> My To-Do List <FontAwesomeIcon icon={ faBook }/></h1>
      <div className="flex-row">
        <div className="flex-large">
          {/* редактируем ? рисуй форму редактирования, иначе - форму добавления */}
          {editing ? (
            <div>
              <h2>Edit note</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
              <div>
                <h2>Add note</h2>
                <AddUserForm addUser={addUser} />
              </div>
            )}
        </div>
        <div className="flex-large">
          <h2>Notes</h2>
          {/* передаем editRow */}
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  )
}

export { App }