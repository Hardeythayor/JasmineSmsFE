import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import BaseLayout from './components/Layouts/BaseLayout'
import Login from './Pages/Auth/Login'
import Setting from './Pages/Settings/Setting'
import CreditHistory from './Pages/CreditHistory/CreditHistory'
import ShipmentDetails from './Pages/ShipmentDetails/ShipmentDetails'
import Dashboard from './Pages/Dashboard/Dashboard'
import Thirdparty from './Pages/ThirdPartyTest/Thirdparty'
import SendMessage from './Pages/SendMessage/SendMessage'
import Register from './Pages/Auth/Register'
import useAuth from './hooks/useAuthContext'
import ViewDetails from './Pages/ShipmentDetails/ViewDetails'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import ManageUsers from './Pages/Admin/ManageUsers'

const AppRoutes = () => {
  const {userData}  = useAuth()

  return (
    <Routes>
       
<Route path='/admin'>
            <Route index element={userData && userData.userInfo && userData.userInfo.user_type === 'admin' ? <BaseLayout><AdminDashboard /></BaseLayout> : <Navigate to="/auth/login"/>} />
            <Route path='users' element={userData && userData.userInfo && userData.userInfo.user_type === 'admin' ? <BaseLayout><ManageUsers /></BaseLayout> : <Navigate to="/auth/login"/>} />
</Route>
        <Route path='/'>
            <Route index element={userData && userData.userInfo ? <BaseLayout><SendMessage /></BaseLayout> : <Navigate to="/auth/login"/>} />
            <Route path='dashboard' element={userData && userData.userInfo ? <BaseLayout><Dashboard /></BaseLayout> : <Navigate to="/auth/login"/>}></Route>
            <Route path='settings' element={userData && userData.userInfo ? <BaseLayout><Setting /></BaseLayout> : <Navigate to="/auth/login"/>}></Route>
            <Route path='credits' element={userData && userData.userInfo ? <BaseLayout><CreditHistory /></BaseLayout> : <Navigate to="/auth/login"/>}></Route>
            <Route path='messages' element={userData && userData.userInfo ? <BaseLayout><ShipmentDetails /></BaseLayout> : <Navigate to="/auth/login"/>}></Route>
            <Route path='details/:id' element={userData && userData.userInfo ? <BaseLayout><ViewDetails /></BaseLayout> : <Navigate to="/auth/login"/>}></Route>
            <Route path='test' element={userData && userData.userInfo ? <BaseLayout><Thirdparty /></BaseLayout> : <Navigate to="/auth/login"/>}></Route>

            <Route path="auth">
                <Route path="login" element={userData && userData.userInfo ? <Navigate to='/' /> : <Login />} />
                <Route path="register" element={userData && userData.userInfo ? <Navigate to='/' /> : <Register />} />
            </Route>
        </Route>
    </Routes>
  )
}

export default AppRoutes
