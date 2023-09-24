import {Routes,Route} from 'react-router-dom'

import Navbar from "./components/navbar/Navbar"
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'


function App() {
  return (
    <>
     <Navbar/>
     <Routes >
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
     </Routes>
    </>
  )
}

export default App
