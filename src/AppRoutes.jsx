import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BaseLayout from './components/Layouts/BaseLayout'
import Login from './Pages/Auth/Login'
import Setting from './Pages/Settings/Setting'
import CreditHistory from './Pages/CreditHistory/CreditHistory'
import ShipmentDetails from './Pages/ShipmentDetails/ShipmentDetails'
import Dashboard from './Pages/Dashboard/Dashboard'
import Thirdparty from './Pages/ThirdPartyTest/Thirdparty'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/'>
            <Route index element={<BaseLayout><Login /></BaseLayout>} />
            <Route path='dashboard' element={<BaseLayout><Dashboard /></BaseLayout>}></Route>
            <Route path='settings' element={<BaseLayout><Setting /></BaseLayout>}></Route>
            <Route path='credits' element={<BaseLayout><CreditHistory /></BaseLayout>}></Route>
            <Route path='messages' element={<BaseLayout><ShipmentDetails /></BaseLayout>}></Route>
            <Route path='test' element={<BaseLayout><Thirdparty /></BaseLayout>}></Route>
        </Route>
    </Routes>
  )
}

export default AppRoutes
