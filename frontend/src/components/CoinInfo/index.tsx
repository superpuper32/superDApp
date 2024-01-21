import { useQuery } from '@tanstack/react-query'

import ApiManager from '../../api/apiManager'
import { StyledCoinInfo } from './CoinInfo.styled'
import { StyledFlex } from '../styles/Flex.styled'

type CoinInfoPropsType = {
    currency: string
    coin: string
}

type CoinType = {
    name: string
    market_cap_rank: number
    image: string
    current_price: number
    currency: string
}

const CoinInfo: React.FC<CoinInfoPropsType> = ({ currency, coin }) => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['ethereumData'],
    queryFn: ApiManager.fetchCoinsMarkets(currency, coin)
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
        {data.map((coin: CoinType): JSX.Element => (
            <StyledCoinInfo>
                <StyledFlex>
                    <div>{coin.market_cap_rank}</div>
                    <img src={coin.image}/>
                    <div>{coin.name}</div>
                    <div>{coin.current_price} USD</div>
                </StyledFlex>
            </StyledCoinInfo>
        ))}
      <div>{isFetching ? 'Updating...' : ''}</div>
    </div>
  )
}

export default CoinInfo
