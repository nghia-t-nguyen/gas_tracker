import './SignUp.css'
import Navbar from '../components/navbars/NavbarSignUp'
import ButtonPrimary from '../components/buttons/ButtonPrimary';
import { useRef, useState } from 'react';

export default function SignUp() {
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const divRef = useRef(null);

    const handleMouseMove = (event) => {
        const rect = divRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setCoordinates({ x, y });
    };

    return (
        <div className="signup-content--max-width">
            <Navbar />
            <div className='signup-form--container'>
                <div className='signup-form--clipped-circle'
                    ref={divRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => { setIsVisible(true) }}
                    onMouseLeave={() => { setIsVisible(false) }}>
                    <div className='circle'
                        style={{
                            left: coordinates.x,
                            top: coordinates.y,
                            visibility: isVisible ? 'visible' : 'hidden'
                        }}>
                    </div>
                    <div className='signup-form'>
                        <SignUpForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    return (
        <div className='signup-form--inner-container'>
            <h1>Welcome to <span>gas_tracker</span></h1>
            <p>sign up with email</p>
            <input className="sign-up-form--input" type='email' placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
            <input className="sign-up-form--input" type='password' placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
            <input className="sign-up-form--input" type='password' placeholder="confirm password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
            <ButtonPrimary title='Continue' />
            <div className='sign-up-form--or-container'>
                <div className='sign-up-form--or-left-div'></div>
                <div>
                    <p className='sign-up-form--or'>or</p>
                </div>
                <div className='sign-up-form--or-right-div'></div>
            </div>
            <ButtonPrimary title='Sign in with Google' />
        </div>
    )
}