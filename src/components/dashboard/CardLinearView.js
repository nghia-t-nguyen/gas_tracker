import './CardLinearView.css'
import { coins } from '../../database_testing/data'

export default function CardLinearView() {
    return (
        <div className='card-linear-view'>
            {coins.map(x => <CardLinearState data={x} />)}
        </div>
    )
}

function CardLinearState(props) {
    return (
        <div className='card--linear-state'>
            <h2>{props.data.name}</h2>
            <div className='card--linear-end-container'>
                <span className='graph-time'>24H</span>
                <div className='card--graph-linear'>graph</div>
                <span className='graph-ticker--span'>
                    -111.11%
                </span>
                <a className='card-linear--more-details' href=''>see more details</a>
                <div title='add to watchlist' className='card--plus'><span className='card--minus--span'>+</span></div>
            </div>
        </div>
    )
}