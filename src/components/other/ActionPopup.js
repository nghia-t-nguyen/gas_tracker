import './ActionPopup.css';
import ButtonPrimary from '../buttons/ButtonPrimary';
import ButtonSecondary from '../buttons/ButtonSecondary';

export default function ActionPopup(props) {
    return (
        <>
            {props.isVisible &&
                <div className="action-popup-container">
                    <div className='action-popup-max-width'>
                        <div className='action-popup'>
                            <h2 className='action-popup-heading'>{props.heading}</h2>
                            <span className='action-popup-subtitle'>{props.subtitle}</span>
                            <div className='action-popup--button-container'>
                                <ButtonSecondary name='Cancel' handleClick={props.handleCancel} />
                                <ButtonPrimary name='Delete Account' handleClick={props.handleAction} />
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}