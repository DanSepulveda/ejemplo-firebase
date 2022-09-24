import Navbar from "./Navbar"

const Layout = (props) => {
    return (
        <main>
            <Navbar />
            {props.children}
        </main>
    )
}

export default Layout