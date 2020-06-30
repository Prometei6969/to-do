import React, { useState } from 'react'
import { AddUserForm } from './forms/AddUserForm'
import { EditUserForm } from './forms/EditUserForm'
import { UserTable } from './tables/NoteTable'
import './App.css'
import uuid from "uuid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from "@fortawesome/free-solid-svg-icons";


const App = () => {


  const usersData = [
    { id: uuid.v4(), note: 'Go to the training' },
    { id: uuid.v4(), note: 'Walking with the dog' },
  ]


  const [users, setUsers] = useState(usersData)
  // флаг editing - изначально false, функция установки флага
  const [editing, setEditing] = useState(false)
  // начальное значение для формы редактирования
  // так как мы не знаем, кто редактируется - пустые поля
  const initialFormState = { id: null, note: '' }
  // значение "текущий пользователь на редактировании" + функция установки этого значения
  const [currentUser, setCurrentUser] = useState(initialFormState)


  const addUser = user => {
    user.id = uuid.v4()
    if (localStorage.getItem('list') == null) {
      const list = []
      list.push(user);
      localStorage.setItem("list", JSON.stringify(list))
    }
    else {
      const list = JSON.parse(localStorage.getItem('list'))
      list.push(user)
      localStorage.setItem("list", JSON.stringify(list))
    }

    setUsers([...users, user])
  }

  const deleteUser = id => {
    setEditing(false)
    setUsers(users.filter(user => user.id !== id))
    let listValue = JSON.parse(localStorage.getItem('list'));
    let index = listValue.indexOf(id);
    listValue.splice(index, 1);

    localStorage.setItem('list', JSON.stringify(listValue))
  }

  // обновление пользователя
  const updateUser = (id, updatedUser) => {
    // когда мы готовы обновить пользователя, ставим флажок editing в false
    setEditing(false)
    // и обновляем пользователя, если нашли его по id
    setUsers(users.map(user => (user.id === id ? updatedUser : user)))
    let listValue = JSON.parse(localStorage.getItem('list'));
    let index = listValue.indexOf(id);

    listValue.splice(index, 1, updatedUser);

    localStorage.setItem('list', JSON.stringify(listValue))
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
      <h1> My To-Do List <FontAwesomeIcon icon={faBook} /></h1>
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