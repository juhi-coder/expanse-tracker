import { createStore } from "@reduxjs/toolkit";
const counterReducer=(state={counter:0,showcounter:false},action)=>{
        if(action.type==='add'){
            return {counter: state.counter+5,
            showcounter: state.showcounter
            };
        }
        if(action.type==='minus'){
            return {counter: state.counter-5,
                showcounter: state.showcounter
            };
        }

        if(action.type==='togle'){
            return{
                showcounter: !state.showcounter,
                counter: state.counter
            }
        }
            return state;



}
const Store=createStore(counterReducer);


export default Store;