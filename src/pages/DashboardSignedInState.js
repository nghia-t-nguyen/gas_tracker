import './Dashboard.css';
import Navbar from '../components/navbars/NavbarDashboard';
import CardGalleryViewWatchlist from '../components/dashboard/CardGalleryViewWatchlist'
import CardLinearViewWatchlist from '../components/dashboard/CardLinearViewWatchlist'
import CardGalleryViewOther from '../components/dashboard/CardGalleryViewOther'
import CardLinearViewOther from '../components/dashboard/CardLinearViewOther'
import galleryViewIcon from '../assets/icons/gallery_view_icon.svg';
import listViewIcon from '../assets/icons/list_view_icon.svg';
import CompareTab from '../components/dashboard/CompareTab';
import { useState, useEffect } from 'react';

export default function DashboardSignedInState() {
    const [watchlistGalleryView, setWatchlistGalleryView] = useState(true);
    const [otherCryptoGalleryView, setOtherCryptoGalleryView] = useState(false);
    const [watchlistState, setWatchlistState] = useState([]);
    const [whichTab, setWhichTab] = useState(0);

    // read and update data
    useEffect(() => {

    }, []);

    // update the database
    useEffect(() => {

    }, [watchlistState]);


    const removeFromWatchlist = (tickerSymbol) => {
        setWatchlistState(watchlistState.filter(x => x !== tickerSymbol));
        console.log(tickerSymbol);
    }

    const addToWatchlist = (tickerSymbol) => {
        setWatchlistState((prevList) => {
            const newList = [...prevList, tickerSymbol].sort();
            return newList;
        });
    }

    return (
        <div className='dashboard-content--max-width'>
            <Navbar />
            <div className='tab-title-container'>
                <span
                    className={`tab-title ${whichTab == 0 ? 'tab-focused' : ''}`}
                    onClick={() => { setWhichTab(0) }}
                >
                    manage
                </span>
                <span
                    className={`tab-title ${whichTab == 1 ? 'tab-focused' : ''}`}
                    onClick={() => { setWhichTab(1) }}
                >
                    compare
                </span>
            </div>

            <div className='tab-content-container'>

                {whichTab == 0 &&
                    <div className='manage-watchlist-tab'>
                        <div className='dashboard--section'>
                            <h1>Watchlist</h1>
                            <div className='dashboard--view-button'
                                title='toggle view'
                                onClick={() => setWatchlistGalleryView(prevState => !prevState)}>
                                <img alt='' className='dashboard--view-button-img'
                                    src={watchlistGalleryView ? galleryViewIcon : listViewIcon} />
                                <span className='dashboard--view-button-text'>
                                    view
                                </span>
                            </div>
                        </div>

                        {watchlistGalleryView ? <CardGalleryViewWatchlist removeCard={removeFromWatchlist} watchlist={watchlistState} /> :
                            <CardLinearViewWatchlist removeCard={removeFromWatchlist} watchlist={watchlistState} />}


                        <div className='dashboard--section dashboard--section-other'>
                            <h1>Other Available Cryptocurrencies</h1>
                            <div className='dashboard--view-button'
                                title='toggle view'
                                onClick={() => setOtherCryptoGalleryView(prevState => !prevState)}>
                                <img alt='' className='dashboard--view-button-img'
                                    src={otherCryptoGalleryView ? galleryViewIcon : listViewIcon} />
                                <span className='dashboard--view-button-text'>
                                    view
                                </span>
                            </div>
                        </div>

                        {otherCryptoGalleryView ? <CardGalleryViewOther addCard={addToWatchlist} watchlist={watchlistState} /> :
                            <CardLinearViewOther addCard={addToWatchlist} watchlist={watchlistState} />}
                    </div>
                }
                {whichTab == 1 &&
                    <div className='compare-tab-container'>
                        <CompareTab watchlist={watchlistState} />
                    </div>
                }
            </div>
        </div>

    )
}