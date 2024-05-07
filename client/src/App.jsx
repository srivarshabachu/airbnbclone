
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import Layout from './layout'
import IndexPage from './pages/IndexPage'
import RegisterPage from './pages/RegisterPage'
import { UserContextProvider } from './UserContext'
import AccountPage from './pages/AccountPage'

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account/:subpage?" element={<AccountPage />} />
        <Route path="/account/:subpage/:action" element={<AccountPage />} />
      </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
