import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './components/Login'
import Register from './components/Register'
import Passwordform from './components/Passwordform'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Passwordform />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App