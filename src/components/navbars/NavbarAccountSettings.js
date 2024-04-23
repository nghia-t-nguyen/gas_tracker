import './Navbar.css'
import logo from '../../assets/icons/cube-logo.svg'
import { useNavigate } from 'react-router-dom';

export default function NavbarHomeGuest() {
    const navigate = useNavigate();
    const goBackToDashboard = () => {
        navigate('/dashboard')
    }

    return (
        <div className='navbar-container'>
            <nav className='flexbox--space-between flexbox--vertical-center'>
                <div className='flexbox--vertical-center'>
                    <h1 className='back-bracket' onClick={goBackToDashboard}>&lt;</h1>
                    <img alt='' className='logo' src={logo} />
                    <h2 className='navbar--name'>gas_tracker
                        <span className='navbar--name-span'>_ACCOUNT</span>
                    </h2>
                </div>
            </nav>
        </div>
    )
}