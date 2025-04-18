import { useState } from 'react'
import Authentication from './Authentication'
import Modal from './Modal'
import { useAuth } from '../context/AuthContext'


const Layout = ({ children, isAuthenticated }) => {

    const [showModal, setShowModal] = useState(false)
    const { logout } = useAuth()

    const header = (
        <header>
            <div>
                <h1 className='font-bold text-gradient'>CAFFIEND</h1>
                <p>For Coffee Insatiates</p>
            </div>
            <button onClick={() => {
                if (isAuthenticated) { logout() } else { setShowModal(true) }
            }}>
                {isAuthenticated ? <p>Log out</p> : <p>Sign in</p>}
                <i className="fa-solid fa-mug-hot"></i>
            </button>
        </header>
    )

    const footer = (
        <footer>
            <p>
                <span className="text-gradient">Caffiend</span> was made by <a target="_blank" href="https://www.linkedin.com/in/rola-al-ahmad/">Rola Al-Ahmad</a>
                <br />Using the <a href="https://www.fantacss.smoljames.com" target="_blank">FantaCSS</a> design library.
                <br />Check out the project on <a target="_black" href="https://github.com/Rola-Al-Ahmad/REACTJS-FULL-COURSE">GitHub</a>!
            </p>
        </footer>
    )

    function handleCloseModal() {
        setShowModal(false)
    }

    return (
        <>
            {showModal && (
                <Modal handleCloseModal={handleCloseModal}>
                    <Authentication handleCloseModal={handleCloseModal} />
                </Modal>
            )}
            {header}
            <main>
                {children}
            </main>
            {footer}
        </>
    )
}

export default Layout