import './EmailVerification.css'
import Navbar from '../components/navbars/NavbarSignUp'
import ButtonPrimary from '../components/buttons/ButtonPrimary';
import { useRef, useState } from 'react';

export default function EmailVerification() {
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
        <div className="email-verification-content--max-width">
            <Navbar />
            <div className='email-verification-form--container'>
                <div className='email-verification-form--clipped-circle'
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
                    <div className='email-verification-form'>
                        <EmailVerificationForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

function EmailVerificationForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='email-verification-form--inner-container'>
            <h1 className='email-verification-h1'>An email verification has been sent.</h1>
            <p>Verify email before signing in.</p>
            <input className="email-verification-form--input" type='email' placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
            <input className="email-verification-form--input" type='password' placeholder="password" value={email} onChange={e => setPassword(e.target.value)} />
            <div className='resend-email--container'><a className='resend-email--anchor'>Didn't receive an email? Click here to resend email.</a></div>
            <ButtonPrimary title='Sign in' />
        </div>
    )
}