import './Message.css'

export default function Message(props) {
    return (
        <div className='message-container'>
            <div className='message-inner-container'>
                {props.text}
            </div>
        </div>
    )
}