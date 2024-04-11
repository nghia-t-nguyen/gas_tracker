import './Navbar.css'
import logo from '../../assets/icons/cube-logo.svg'
import ButtonPrimary from '../buttons/ButtonPrimary'
import ButtonSecondary from '../buttons/ButtonSecondary'

export default function NavbarHomeGuest() {
    return (
        <div className='navbar-container'>
            <nav className='flexbox--space-between flexbox--vertical-center'>
                <div className='flexbox--vertical-center'>
                    <img alt='' className='logo' src={logo} />
                    <h2 className='navbar--name'>gas_tracker
                        <span className='navbar--name-span'>_DASHBOARD</span>
                    </h2>
                </div>
                <div className='navbar--buttons-container'><ButtonSecondary name='Account Settings' /> <ButtonPrimary name='Sign out' /></div>
            </nav>
        </div>
    )
}