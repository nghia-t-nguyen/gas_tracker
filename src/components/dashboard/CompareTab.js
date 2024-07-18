import './CompareTab.css'
import ButtonAction from '../buttons/ButtonAction';
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from '@mui/material/FormGroup';
import Checkbox from "@mui/material/Checkbox";
import MultiGraph from './Multigraph';
import { coins } from '../../data/data'
import { useState, useEffect } from 'react';

export default function CompareTab(props) {
    // Initialize checkedItems to list like {tickerSymbol1:false, ...}
    const [checkedItems, setCheckedItems] = useState(Object.keys(coins).reduce((acc, item) => {
        if (props.watchlist.includes(item)) {
            acc[item] = true
        } else {
            acc[item] = false
        }

        return acc;
    }, {}));
    const [highlightedItems, setHighlightedItems] = useState(Object.keys(coins).reduce((acc, item) => {
        acc[item] = false;
        return acc;
    }, {}));
    const [normalized, setNormalized] = useState(false);
    const [allData, setAllData] = useState({})
    const [error, setError] = useState('')

    //CHECKBOX FUNCTIONS
    const handleCheckboxChange = (item) => {
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [item]: !prevCheckedItems[item],
        }));
    };

    const handleHighlightedItemsEnter = (item) => {
        setHighlightedItems(prev => ({ ...prev, [item]: true }));
    };

    const handleHighlightedItemsLeave = (item) => {
        setHighlightedItems(prev => ({ ...prev, [item]: false }));
    };

    const clearSelection = () => {
        var updatedList = {}
        Object.keys(checkedItems).forEach(key => {
            updatedList[key] = false;
        });
        setCheckedItems(updatedList);
    }

    const selectWatchlistOnly = () => {
        clearSelection()

        props.watchlist.forEach(x => {
            setCheckedItems((prevCheckedItems) => ({
                ...prevCheckedItems,
                [x]: true,
            }));
        })
    }

    const selectAll = () => {
        var updatedList = {}
        Object.keys(checkedItems).forEach(key => {
            updatedList[key] = true;
        });
        setCheckedItems(updatedList);
    }
    // END CHECKBOX FUNCTIONS


    // DATA FUNCTIONS
    // -READ DATA
    useEffect(() => {
        const feeURLs = Object.keys(coins).reduce((acc, item) => {
            acc[item] = coins[item].feeURL;
            return acc;
        }, {});
        const fetchAllData = async () => {
            try {
                const fetchPromises = Object.entries(feeURLs).map(async ([key, url]) => {
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            // 'Authorization': 'Bearer YOUR_TOKEN' // Add this line if authentication is required
                        }
                    });


                    if (!response.ok) {
                        throw new Error(`Network response was not ok for URL: ${url}`);
                    }

                    const jsonData = await response.json();
                    return { [key]: jsonData };
                });

                const data = await Promise.all(fetchPromises);
                const result = data.reduce((acc, item) => {
                    const key = Object.keys(item)[0];  // Get the key of the current item
                    acc[key] = item[key];  // Add the key-value pair to the accumulator
                    return acc;  // Return the accumulator for the next iteration
                }, {});

                setAllData(result)
                // allData should be formatted as {'BTC': Array(30), 'ETH': Array(30), ...}
            } catch (error) {
                setError(error);
            } finally {
                //setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    // - DISPLAY DATA PROCESSING
    const displayData = Object.entries(allData)
        .filter(([key, _]) => checkedItems[key])
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

    const labels = Object.keys(displayData).length === 0 ? ['No data.'] : Object.entries(displayData)[0][1].map(x => x.date.date)
    // labels formatted as an array of dates
    const datasets = Object.keys(displayData).length === 0 ? [] :
        normalized ?
            Object.entries(displayData).reduce((acc, [key, value]) => {
                const thisLabel = `${key} Fee Value`
                const vals = value.map(x => x[coins[key].labelName])
                const minValue = Math.min(...vals);
                const maxValue = Math.max(...vals);
                const color = highlightedItems[key] ? '#FF10F0' : '#ECE4FF'
                const thickness = highlightedItems[key] ? 4 : 3
                const normalized = vals.map(x => (x - minValue) / (maxValue - minValue))
                const obj = {
                    label: thisLabel,
                    data: normalized,
                    fill: false,
                    borderColor: color,
                    backgroundColor: color,
                    tension: 0.3,
                    pointRadius: 2,
                    pointHoverRadius: 6,
                    borderWidth: thickness,
                }
                acc.push(obj)
                return acc;
            }, []) :
            Object.entries(displayData).reduce((acc, [key, value]) => {
                const thisLabel = `${key} Fee Value`
                const vals = value.map(x => x[coins[key].labelName])
                const color = highlightedItems[key] ? '#FF10F0' : '#ECE4FF'
                const thickness = highlightedItems[key] ? 4 : 3
                const obj = {
                    label: thisLabel,
                    data: vals,
                    fill: false,
                    borderColor: color,
                    backgroundColor: color,
                    tension: 0.3,
                    pointRadius: 2,
                    pointHoverRadius: 6,
                    borderWidth: thickness,
                }
                acc.push(obj)
                return acc;
            }, [])

    // END DATA FUNCTIONS

    return (
        <div className="compare-tab">
            <div className='graph-views-container'>
                <div className='multigraph-view compare-tab-view'>
                    <h2 className='compare-tab-view--heading'>Compare Fee Values</h2>
                    <div className='multigraph-container'>
                        <MultiGraph labels={labels} datasets={datasets} />
                    </div>
                    <div className='checkbox-container'>
                        <FormControlLabel
                            style={{ color: 'white', margin: 0, padding: 0 }}
                            control={<Checkbox checked={normalized} onChange={() => setNormalized(prevState => !prevState)} style={{ color: '#4DFFDF', margin: 0, padding: 0 }} size="small" />}
                            label={
                                <span style={{ fontFamily: '"Space Mono", monospace', userSelect: 'none', fontSize: '1rem', marginLeft: '0.5rem', padding: 0 }}>
                                    Normalize
                                </span>
                            }
                        />
                    </div>


                </div>
                <div className='options-view compare-tab-view'>
                    <div className='quick-actions--container'>
                        <h2 className='compare-tab-view--heading compare-tab-selection--heading'>Selection</h2>
                        <ButtonAction handleClick={selectWatchlistOnly} name='Select Watchlist Only' />
                        <ButtonAction handleClick={selectAll} name='Select All' />
                        <ButtonAction handleClick={clearSelection} name='Clear Selection' />
                    </div>
                    <div className='selection--container'>
                        <FormGroup style={{ margin: 0, padding: 0 }}>
                            {Object.keys(coins).map(x => <FormControlLabel
                                key={x}
                                onMouseEnter={() => handleHighlightedItemsEnter(x)}
                                onMouseLeave={() => handleHighlightedItemsLeave(x)}
                                style={{ color: 'white', margin: '0 0.4rem', padding: 0, whiteSpace: 'nowrap' }}
                                control={<Checkbox checked={checkedItems[x] || false}
                                    onChange={() => handleCheckboxChange(x)}
                                    style={{ color: '#4DFFDF', margin: 0, padding: 0 }} size="small" />}
                                label={
                                    <span style={{ fontFamily: '"Space Mono", monospace', userSelect: 'none', fontSize: '1rem', marginLeft: '0.5rem', padding: 0 }}>
                                        {`${x}: ${coins[x].name}`}
                                    </span>
                                }
                            />)}
                        </FormGroup>
                    </div>
                </div>
            </div>
        </div>
    )
}
