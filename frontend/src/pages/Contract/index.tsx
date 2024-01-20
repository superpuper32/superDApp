import { StyledContainer } from '../../components/styles/Container.styled'

type SmartContractProps = {
    name: string
}

const SmartContract: React.FC<SmartContractProps> = ({ name }) => {
    
    return (
    <>
      <StyledContainer>
          <h2>{name} Contract</h2>
        </StyledContainer>
    </>
  )
}

export default SmartContract
