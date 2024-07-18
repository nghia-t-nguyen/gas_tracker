import './ButtonAction.css'

export default function ButtonAction(props) {
    return (
        <button onClick={props.handleClick} className='button--action'>
            <span className='button--action-title'>{props.name}</span>
        </button>
    )
}