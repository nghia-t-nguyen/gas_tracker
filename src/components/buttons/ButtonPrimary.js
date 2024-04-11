import './ButtonPrimary.css'

export default function ButtonPrimary(props) {
    return (
        <button className='button--primary'>
            <h3 className='button--primary-title'>{props.name}</h3>
        </button>
    )
}