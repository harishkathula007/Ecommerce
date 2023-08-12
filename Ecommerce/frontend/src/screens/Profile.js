import React from 'react'
import {useContext} from 'react'
import {Store} from '../Store.js'
function Profile() {
    const {state,dispatch}=useContext(Store);
    const{userInfo}=state;
console.log(userInfo)
  return (
    <div className='text-center mt-5'>
    <h1>Name :- {userInfo.name} </h1>
    <h1>Email :- {userInfo.email} </h1>

    </div>
  )
}

export default Profile