import './Dashboard.css';
import Navbar from '../components/navbars/NavbarDashboard';
import CardGalleryViewWatchlist from '../components/dashboard/CardGalleryViewWatchlist'
import CardLinearViewWatchlist from '../components/dashboard/CardLinearViewWatchlist'
import CardGalleryViewOther from '../components/dashboard/CardGalleryViewOther'
import CardLinearViewOther from '../components/dashboard/CardLinearViewOther'
import CompareTab from '../components/dashboard/CompareTab';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../provider/Authentication';

export default function DashboardSignedInState() {
    const [watchlistGalleryView, setWatchlistGalleryView] = useState(true);
    const [otherCryptoGalleryView, setOtherCryptoGalleryView] = useState(false);
    const [watchlistState, setWatchlistState] = useState([]);
    const [whichTab, setWhichTab] = useState(0);
    const { saveArrayToFirestore, readArrayFromFirestore } = useContext(AuthContext);

    // // read and update data
    // useEffect(() => {
    //     setWatchlistState(readArrayFromFirestore())
    // }, []);

    // // update the database
    // useEffect(() => {
    //     saveArrayToFirestore(watchlistState)
    // }, [watchlistState]);


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
                                {watchlistGalleryView ?
                                    <svg className='dashboard--view-button-img' width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="1" y="1" width="5" height="5" rx="1" fill="#4DFFDF" />
                                        <rect x="7" y="1" width="5" height="5" rx="1" fill="#4DFFDF" />
                                        <rect x="7" y="7" width="5" height="5" rx="1" fill="#4DFFDF" />
                                        <rect x="1" y="7" width="5" height="5" rx="1" fill="#4DFFDF" />
                                    </svg> :
                                    <svg className='dashboard--view-button-img' width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="1" y="1" width="11" height="3" rx="1" fill="#4DFFDF" />
                                        <rect x="1" y="9" width="11" height="3" rx="1" fill="#4DFFDF" />
                                        <rect x="1" y="5" width="11" height="3" rx="1" fill="#4DFFDF" />
                                    </svg>}
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
                                {otherCryptoGalleryView ?
                                    <svg className='dashboard--view-button-img' width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="1" y="1" width="5" height="5" rx="1" fill="#4DFFDF" />
                                        <rect x="7" y="1" width="5" height="5" rx="1" fill="#4DFFDF" />
                                        <rect x="7" y="7" width="5" height="5" rx="1" fill="#4DFFDF" />
                                        <rect x="1" y="7" width="5" height="5" rx="1" fill="#4DFFDF" />
                                    </svg> :
                                    <svg className='dashboard--view-button-img' width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="1" y="1" width="11" height="3" rx="1" fill="#4DFFDF" />
                                        <rect x="1" y="9" width="11" height="3" rx="1" fill="#4DFFDF" />
                                        <rect x="1" y="5" width="11" height="3" rx="1" fill="#4DFFDF" />
                                    </svg>}
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