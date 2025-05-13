import React from 'react'
import SideBar from './SideBar'
import Header from './Header'

const BaseLayout = ({children}) => {
  return (
    <>
        <Header />
        <div className="container-fluid">
            <div className="row">
                <SideBar />
                <div className='col-lg-10 col-sm-12'>
                    <main id="main-content" className='py-5 px-3'>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    </>
  )
}

export default BaseLayout
