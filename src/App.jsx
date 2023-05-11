import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './common/Navbar/Navbar'
import './App.css'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Body from './pages/Body/Body'

function App() {

  return (
    <>
      <Navbar/>
      <Body />
    </>
  )
}

export default App
