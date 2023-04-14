import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
const Counter = () => {
    const counter=useSelector(state=>state.counter)
    const show=useSelector(state=>state.showcounter)
    const dispatch=useDispatch()
    const addHandler=()=>{
      dispatch({type:'add'})
    }
    const minusHandler=()=>{
      dispatch({type:'minus'})
    }
    const toggleHandler=()=>{
      dispatch({type:'togle'})
    }
  return (
    <div>
     {show && <div>{counter}</div>}
      <br></br>
      <button onClick={addHandler}>add</button>
      <button onClick={minusHandler}>minus</button>
      <button onClick={toggleHandler}>Toggle</button>
    </div>
  )
}

export default Counter