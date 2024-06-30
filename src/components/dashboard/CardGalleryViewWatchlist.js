import './CardGalleryView.css'
import { coins } from '../../database_testing/data'
import Graph from './Graph'

export default function CardGalleryViewWatchlist(props) {
    return (
        <div className='card-gallery-view'>
            {props.watchlist.length === 0 && <p style={{ 'color': '#E683FF' }}>Add to watchlist from below.</p>}
            {props.watchlist.map(key => coins[key]).map(x => <CardGalleryStateWatchlist removeCard={props.removeCard} key={x.tickerSymbol} symbol={x.tickerSymbol} data={x} />)}
        </div>
    )
}

function CardGalleryStateWatchlist(props) {
    return (
        <div className='card--gallery-state'>
            <div className='card--topline-container'>
                <h2>{props.data.name}</h2>
                <div
                    onClick={() => props.removeCard(props.symbol)}
                    title='remove from watchlist' className='card--minus'><span className='card--minus--span'>-</span></div>
            </div>
            {/* <div className='card--graph-gallery'>placeholder for graph</div> */}
            <Graph />
            <div className='card--endline-container'>
                <div className='card--endline-current-fee--container'>
                    <span className='card--endline-current-fee'>fee: 1.385</span>
                </div>
                <a className='card--more-details' href=''>more details</a>
            </div>
        </div>
    )
}