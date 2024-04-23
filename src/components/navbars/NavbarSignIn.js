import './Navbar.css'
import logo from '../../assets/icons/cube-logo.svg'
import ButtonPrimary from '../buttons/ButtonPrimary'
import { useNavigate } from 'react-router-dom'

export default function NavbarSignIn() {
    const navigate = useNavigate();

    const goToSignUp = () => {
        let path = '/sign-up'
        navigate(path);
    }

    return (
        <div className='navbar-container'>
            <nav className='flexbox--space-between flexbox--vertical-center'>
                <a href='/'><div className='flexbox--vertical-center'><img alt='' className='logo' src={logo} /><h2 className='navbar--name'>gas_tracker</h2></div></a>
                <div className='navbar--buttons-container'>
                    <h3 className='navbar--buttons-container-text'>Don't have an account?</h3>
                    <ButtonPrimary name='Sign up' handleClick={goToSignUp} />
                </div>
            </nav>
        </div>
    )
}