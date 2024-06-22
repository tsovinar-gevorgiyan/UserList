import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'

export const UserList = ({ users, onDelete, onIncreaseSalary }) => {
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3004/users/${id}`)
      .then(() => {
        onDelete(id)
        toast.success("User has been deleted successfully")
      })
      .catch(err => toast.error("Error deleting user"))
  };

  const handleIncreaseSalary = (id, currentSalary) => {
    const newSalary = Number(currentSalary) + 50000
    axios.patch(`http://localhost:3004/users/${id}`, { salary: newSalary })
      .then(() => {
        onIncreaseSalary(id, newSalary);
        toast.success("User salary has been increased successfully")
      })
      .catch(err => toast.error("Error increasing salary"))
  }

  return (
    <div>
      <h1>UserList</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>surname</th>
            <th>salary</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(elm => (
            <tr key={elm.id} style={{ backgroundColor: elm.salary > 800000 ? 'purple' : 'black' }}>
              <td>{elm.id}</td>
              <td>{elm.name}</td>
              <td>{elm.surname}</td>
              <td>{elm.salary}</td>
              <td>
                <button onClick={() => handleDelete(elm.id)}>delete</button>
                <button onClick={() => handleIncreaseSalary(elm.id, elm.salary)}>increase salary</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}