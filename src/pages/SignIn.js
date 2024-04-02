import './SignIn.css'
import Navbar from '../components/navbars/NavbarSignIn'
import ButtonPrimary from '../components/buttons/ButtonPrimary';
import ButtonPrimaryGoogle from '../components/buttons/ButtonPrimaryGoogle';
import { useRef, useState } from 'react';

export default function SignIn() {
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
        <div className="signin-content--max-width">
            <Navbar />
            <div className='signin-form--container'>
                <div className='signin-form--clipped-circle'
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
                    <div className='signin-form'>
                        <SignInForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='signin-form--inner-container'>
            <h1>Sign into <span>gas_tracker</span></h1>
            <p>sign in with email</p>
            <input className="signin-form--input" type='email' placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
            <input className="signin-form--input" type='password' placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
            <div className='forgot-password--container'><a className='forgot-password--anchor'>Forgot password? Click here to reset password.</a></div>
            <ButtonPrimary title='Sign in' />
            <div className='signin-form--or-container'>
                <div className='signin-form--or-left-div'></div>
                <div>
                    <p className='signin-form--or'>or</p>
                </div>
                <div className='signin-form--or-right-div'></div>
            </div>
            <ButtonPrimaryGoogle title='Sign in with Google' />
        </div>
    )
}