import { StyledContainer } from '../../components/styles/Container.styled'
import { StyledFlex } from '../../components/styles/Flex.styled'
import SmartContractCard from '../../components/SmartContractCard'

const Main = () => {
  return (
    <>
      <StyledContainer>
          <StyledFlex>
            <SmartContractCard name="Dutch Auction" link={'contract'} />
            <SmartContractCard name="Crowd Fund" link={'contract'} />
          </StyledFlex>
        </StyledContainer>
    </>
  )
}

export default Main;