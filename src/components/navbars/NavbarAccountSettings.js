import './Navbar.css'
import logo from '../../assets/icons/cube-logo.svg'
import ButtonPrimary from '../buttons/ButtonPrimary'
import ButtonSecondary from '../buttons/ButtonSecondary'

export default function NavbarHomeGuest() {
    return (
        <div className='navbar-container'>
            <nav className='flexbox--space-between flexbox--vertical-center'>
                <div className='flexbox--vertical-center'>
                    <h1 className='back-bracket'>&lt;</h1>
                    <img alt='' className='logo' src={logo} />
                    <h2 className='navbar--name'>gas_tracker
                        <span className='navbar--name-span'>_ACCOUNT</span>
                    </h2>
                </div>
            </nav>
        </div>
    )
}