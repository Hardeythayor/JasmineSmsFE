// import React from 'react'
// import SideBar from './SideBar'
// import Header from './Header'
// import AdminSideBar from './AdminSideBar';
// import useAuth from '../../hooks/useAuthContext';


// const BaseLayout = ({children}) => {
//   return (
//     <>
//         <Header />
//         <div className="container-fluid">
//             <div className="row">
//                 <SideBar />
//                 <div className='col-lg-10 col-sm-12'>
//                     <main id="main-content" className='py-5 px-3'>
//                         {children}
//                     </main>
//                 </div>
//             </div>
//         </div>
//     </>
//   )
// }


// export default BaseLayout


import React from 'react';
import Header from './Header';
import SideBar from './SideBar';
import AdminSideBar from './AdminSideBar'; 
import useAuth from '../../hooks/useAuthContext'; 

const BaseLayout = ({ children }) => {
  const { userData } = useAuth(); 

  const isAdmin = userData && userData.userInfo && userData.userInfo.user_type === 'admin';

  return (
    <div>
      <Header /> 
      <div className="container-fluid">
        <div className="row">
          {isAdmin ? <AdminSideBar /> : <SideBar />}
          <div className='col-lg-10 col-sm-12'>
              <main id="main-content" className='py-5 px-3'>
                  {children}
              </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;

