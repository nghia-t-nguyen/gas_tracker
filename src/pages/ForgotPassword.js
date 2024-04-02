import './ForgotPassword.css'
import Navbar from '../components/navbars/NavbarSignIn'
import ButtonPrimary from '../components/buttons/ButtonPrimary';
import { useRef, useState } from 'react';

export default function ForgotPassword() {
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
        <div className="forgot-password-content--max-width">
            <Navbar />
            <div className='forgot-password-form--container'>
                <div className='forgot-password-form--clipped-circle'
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
                    <div className='forgot-password-form'>
                        <ForgotPasswordForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

function ForgotPasswordForm() {
    const [email, setEmail] = useState('');

    return (
        <div className='forgot-password-form--inner-container'>
            <h1>Forgot your password?</h1>
            <p>Enter in your email to reset your password.</p>
            <input className="forgot-password-form--input" type='email' placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
            <ButtonPrimary title='Send email password reset' />
        </div>
    )
}