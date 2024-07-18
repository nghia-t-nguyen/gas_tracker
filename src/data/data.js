export const coins = {
    'AVAX': {
        'tickerSymbol': 'AVAX',
        'name': 'Avalanche',
        'labelName': 'gas_value_usd',
        'feeURL': 'http://ec2-3-15-168-58.us-east-2.compute.amazonaws.com:3000/api/avalanche/average-gas-fee'
    },
    'BSC': {
        'tickerSymbol': 'BSC',
        'name': 'Binance Smart Chain',
        'labelName': 'gas_value_usd',
        'feeURL': 'http://ec2-3-15-168-58.us-east-2.compute.amazonaws.com:3000/api/bsc/average-gas-fee'
    },
    'BTC': {
        'tickerSymbol': 'BTC',
        'name': 'Bitcoin',
        'labelName': 'feeValue',
        'feeURL': 'http://ec2-3-15-168-58.us-east-2.compute.amazonaws.com:3000/api/bitcoin/average-gas-fee'
    },
    'DOGE': {
        'tickerSymbol': 'DOGE',
        'name': 'Dogecoin',
        'labelName': 'feeValue',
        'feeURL': 'http://ec2-3-15-168-58.us-east-2.compute.amazonaws.com:3000/api/dogecoin/average-gas-fee'
    },
    'ETH': {
        'tickerSymbol': 'ETH',
        'name': 'Ethereum',
        'labelName': 'gas_value_usd',
        'feeURL': 'http://ec2-3-15-168-58.us-east-2.compute.amazonaws.com:3000/api/ethereum/average-gas-fee'
    },
    'FTM': {
        'tickerSymbol': 'FTM',
        'name': 'Fantom',
        'labelName': 'gas_value_usd',
        'feeURL': 'http://ec2-3-15-168-58.us-east-2.compute.amazonaws.com:3000/api/fantom/average-gas-fee'
    },
    'LTC': {
        'tickerSymbol': 'LTC',
        'name': 'Litecoin',
        'labelName': 'feeValue',
        'feeURL': 'http://ec2-3-15-168-58.us-east-2.compute.amazonaws.com:3000/api/litecoin/average-gas-fee'
    },
    'MATIC': {
        'tickerSymbol': 'MATIC',
        'name': 'Polygon',
        'labelName': 'gas_value_usd',
        'feeURL': 'http://ec2-3-15-168-58.us-east-2.compute.amazonaws.com:3000/api/matic/average-gas-fee'
    },
}

export var watchlist = [
    'BTC', 'ETH'
]

export const available = [
    'AVAX', 'BSC', 'BTC', 'DOGE', 'ETH', 'FTM', 'LTC', 'MATIC',
]