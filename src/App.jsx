import { useEffect, useState } from 'react'
import './App.css'
import { AddUser } from './components/AddUser'
import { UserList } from './components/UserList'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3004/users")
      .then(res => {
        setUsers(res.data)
      })
  }, [])

  const addItem = obj => {
    setUsers([...users, obj])
    toast.success("New user has been added successfully")
  };

  const deleteUser = id => {
    setUsers(users.filter(user => user.id !== id))
  }

  const increaseUserSalary = (id, newSalary) => {
    setUsers(users.map(user => (user.id === id ? { ...user, salary: newSalary } : user)))
  }

  return (
    <div className='row'>
      <ToastContainer />
      <AddUser onAdd={addItem} />
      <UserList
        users={users}
        onDelete={deleteUser}
        onIncreaseSalary={increaseUserSalary}
      />
    </div>
  );
}

export default App;
