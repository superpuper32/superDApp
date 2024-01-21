import axios from 'axios'

import ENDPOINTS from './endpoints'

const GECKO_API = import.meta.env.VITE_GECKO_API
const GECKO_URL = 'https://api.coingecko.com/api/v3'

class ApiManager {
    static fetchCoinsMarkets = (vs_currency: string, ids: string) => {
        const url = `${GECKO_URL}${ENDPOINTS.GECKO.COINS_MARKET(vs_currency, ids)}`
        
        return () => axios
            .get(url, {
                params: {
                    x_cg_demo_api_key: GECKO_API
                }
            })
            .then((res) => res.data)
    }
}

export default ApiManager