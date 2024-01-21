import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import CoinInfo from '../../components/CoinInfo'
import { Container } from '../../components/TogglerButton/TogglerButton.styled'

function Gecko() {

  return (
    <Container>
      <CoinInfo coin="ethereum" currency='usd'/>
      <ReactQueryDevtools initialIsOpen />
    </Container>
  )
}

export default Gecko
