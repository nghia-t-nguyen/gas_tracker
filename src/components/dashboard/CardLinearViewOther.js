import './CardLinearView.css'
import { coins, available } from '../../data/data'

export default function CardLinearViewOther(props) {
    return (
        <div className='card-linear-view'>
            {available.filter(x => !props.watchlist.includes(x)).map(key => coins[key])
                .map(x => <CardLinearStateOther addCard={props.addCard} key={x.tickerSymbol} symbol={x.tickerSymbol} data={x} />)}
        </div>
    )
}

function CardLinearStateOther(props) {
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
                <div
                    onClick={() => props.addCard(props.symbol)}
                    title='add to watchlist'
                    className='card--plus'>
                    <span className='card--minus--span'>+</span>
                </div>
            </div>
        </div>
    )
}