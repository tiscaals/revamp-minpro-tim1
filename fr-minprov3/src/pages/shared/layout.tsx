import NavBar from './komponen/navBar'
import TopNavbar from './topNavBar'

const Layout=({ children }: any)=>{
    return (
        <>
        <NavBar/>
        {children}
        </>
    )
}

export default Layout