
const ENDPOINTS = {
    GECKO: {
        SIMPLE_PRICE: (ids: string, vs_currencies: string) => {
            return `/simple/price?ids=${ids}&vs_currencies=${vs_currencies}`
        },
        COINS_LIST: (include_platform: boolean) => {
            return `/coins/list?include_platform=${include_platform}`
        },
        COINS_MARKET: (vs_currency: string, ids: string) => {
            return `/coins/markets?vs_currency=${vs_currency}&ids=${ids}`
        }
    }
}

export default ENDPOINTS