import './Navbar.css'
import logo from '../../assets/icons/cube-logo.svg'
import ButtonPrimary from '../buttons/ButtonPrimary'
import ButtonSecondary from '../buttons/ButtonSecondary'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/Authentication';

export default function NavbarDashboard() {
    // Navigation
    const navigate = useNavigate();
    const goToAccountSettings = () => {
        navigate('/account-settings');
    }

    // Context
    const { currentUser, signOutUser } = useContext(AuthContext);

    const handleSignOutUser = () => {
        signOutUser()
        navigate('/')
    }

    return (
        <div className='navbar-container'>
            <nav className='flexbox--space-between flexbox--vertical-center'>
                <div className='flexbox--vertical-center'>
                    <img alt='' className='logo' src={logo} />
                    <h2 className='navbar--name'>gas_tracker
                        <span className='navbar--name-span'>_DASHBOARD</span>
                    </h2>
                </div>
                <div className='navbar--buttons-container'>
                    <div className='account-settings-button'>
                        <ButtonSecondary name='Account Settings' handleClick={goToAccountSettings} />
                    </div>
                    <ButtonPrimary name='Sign out' handleClick={handleSignOutUser} /></div>
            </nav>
        </div>
    )
}