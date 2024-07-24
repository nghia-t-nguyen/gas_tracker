export const coins = {
    'AVAX': {
        'tickerSymbol': 'AVAX',
        'name': 'Avalanche',
        'labelName': 'gas_value_usd',
        'feeURL': '/api/avalanche/average-gas-fee'
    },
    'BSC': {
        'tickerSymbol': 'BSC',
        'name': 'Binance Smart Chain',
        'labelName': 'gas_value_usd',
        'feeURL': '/api/bsc/average-gas-fee'
    },
    'BTC': {
        'tickerSymbol': 'BTC',
        'name': 'Bitcoin',
        'labelName': 'feeValue',
        'feeURL': '/api/bitcoin/average-gas-fee'
    },
    'DOGE': {
        'tickerSymbol': 'DOGE',
        'name': 'Dogecoin',
        'labelName': 'feeValue',
        'feeURL': '/api/dogecoin/average-gas-fee'
    },
    'ETH': {
        'tickerSymbol': 'ETH',
        'name': 'Ethereum',
        'labelName': 'gas_value_usd',
        'feeURL': '/api/ethereum/average-gas-fee'
    },
    'FTM': {
        'tickerSymbol': 'FTM',
        'name': 'Fantom',
        'labelName': 'gas_value_usd',
        'feeURL': '/api/fantom/average-gas-fee'
    },
    'LTC': {
        'tickerSymbol': 'LTC',
        'name': 'Litecoin',
        'labelName': 'feeValue',
        'feeURL': '/api/litecoin/average-gas-fee'
    },
    'MATIC': {
        'tickerSymbol': 'MATIC',
        'name': 'Polygon',
        'labelName': 'gas_value_usd',
        'feeURL': '/api/matic/average-gas-fee'
    },
}

export var watchlist = [
    'BTC', 'ETH'
]

export const available = [
    'AVAX', 'BSC', 'BTC', 'DOGE', 'ETH', 'FTM', 'LTC', 'MATIC',
]