import { useContext, useEffect } from 'react'
import './App.css'
import Routeing from './Routeing'
import { DataContext } from './component/DataProvider/DataProvider'
import {Type} from "./Utility/action.js";
import {auth} from "./Utility/firebase.js";

function App() {
   const [{ user }, dispatch] = useContext(DataContext);
 useEffect(() =>{
    auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        dispatch({
          type:Type.SET_USER,
          user:authUser
        })
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null
        });
      }
    })
 }, [])

  return (
    <>
      <Routeing/>
    </>
  )
}

export default App
