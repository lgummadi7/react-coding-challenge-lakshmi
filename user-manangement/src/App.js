import './App.css'
import {useState, useSyncExternalStore} from 'react'
import {configureStore, createSlice} from '@reduxjs/toolkit'
import {Provider, useDispatch, useSelector} from 'react-redux'


import USERS from './data/users'
console.log(USERS)

let USERS_ID = {}

USERS.forEach(user=>{
  USERS_ID[user.id] = user
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    password: ''
  },
  reducers: {
    setUsername: (state, action)=> {
      state.username = action.payload
    },
    setPassword: (state, action)=> {
      state.password = action.payload
    },
  }
})

const {actions, reducer} = userSlice
const {setUsername, setPassword} = actions

const store = configureStore({
  reducer: {
    user: reducer
  }
})


const FormComponent = () => {
  const dipatch = useDispatch()
  const {username, password} = useSelector(state=>state.user)

  const [localUsername, setLocalusername] = useState(username)
  const [localPassword, setLocalPassword] = useState(password)

  const handleNameChange = ({target: {value}}) => {
    setLocalusername(value)
    dipatch(setUsername(value))
  }

  const handlePasswordChange = ({target: {value}}) => {
    setLocalPassword(value)
    dipatch(setPassword(value))
  }

  return (
    <div>
      <label>username</label>
      <input value={localUsername} onChange={handleNameChange}/>
      <br/>
      <label>password</label>
      <input value={localPassword} onChange={handlePasswordChange}/>

      <div>
        <h3>Store Data</h3>
        <p>Username: {username}</p>
        <p>password: {password}</p>
      </div>

    </div>
  )

}






const App = () => {
  return (
    <Provider store ={store}>
      <UserPage users={USERS}/>
      <FormComponent />
    </Provider>
  )
}

const UserPage = ({users}) => {
  const [selecteUser, setSelectUser] = useState(null)
  const handleOnSelect = (event) => {
    setSelectUser(USERS_ID[event.target.value])
  }
  return (
    <div>
      <UserSelect users={users} onSelect={handleOnSelect} selecteUser={selecteUser}/>
      {
        selecteUser ?  <UserDetail userDetails={selecteUser}/> : <div> Select a user to show details </div>
      }
     
    </div>
  )
}

const UserSelect = ({users, onSelect}) => {
  
  return(
    <select onChange={onSelect} >
      <option value="">Select a user</option>
      {
        users.map(user=><option key={user.id} value={user.id}>{user.name}</option>)
      }
      </select>
  )
}

const UserDetail = ({userDetails}) => {
  return (
      <div>
        <p>{userDetails.name}</p>
        <p>{userDetails.username}</p>
        <p>{userDetails.email}</p>
      </div>
  )
}

export default App