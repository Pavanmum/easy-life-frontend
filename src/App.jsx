
import { Route, Routes } from 'react-router-dom';
import './App.css'
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import BookingPage from "./pages/BookingPage";
import ProtectedRoute from './components/ProtectedRoute';
function App() {
 

  return (
    <>
   <Routes>
      <Route   path='/login' element={<LoginPage />} />
      <Route path='/booking' element={<BookingPage />} />
      <Route path='*' element={<h1>404 Not Found</h1>} />
      <Route path='/' element={<ProtectedRoute><LandingPage /></ProtectedRoute>} />

    </Routes>
    </>
  )
}

export default App
