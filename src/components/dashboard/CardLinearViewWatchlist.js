import './CardLinearView.css'
import { coins } from '../../data/data'

export default function CardLinearViewWatchlist(props) {
    return (
        <div className='card-linear-view'>
            {props.watchlist.length === 0 && <p style={{ 'color': '#E683FF', 'marginLeft': '1rem' }}>Add to watchlist from below.</p>}
            {props.watchlist.map(key => coins[key]).map(x => <CardLinearStateWatchlist removeCard={props.removeCard} key={x.tickerSymbol} symbol={x.tickerSymbol} data={x} />)}
        </div>
    )
}

function CardLinearStateWatchlist(props) {
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
                    onClick={() => props.removeCard(props.symbol)}
                    title='add to watchlist'
                    className='card--minus'>
                    <span className='card--minus--span'>-</span>
                </div>
            </div>
        </div>
    )
}