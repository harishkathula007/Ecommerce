import React from 'react'
import { useContext } from 'react';
import { Store } from '../Store';

function FinalScreen() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  console.log(userInfo);
  return (
    <div className='text-center mt-5'>

        <h1> Thankyou you {userInfo.name}</h1>
        <h2> Visit Again ❤️ </h2>
    </div>
    
  )
}

export default FinalScreen