import { StyledContainer } from '../../components/styles/Container.styled';
import { StyledFlex } from '../../components/styles/Flex.styled';
import SmartContractCard from '../../components/SmartContractCard';

const contracts = [
    {   
        contractId: 0,
        name: 'Escrow',
        description: 'Agreement often used when transferring funds in exchange for a good or service.'
    },
    {   
        contractId: 1,
        name: 'Governance',
        description: 'Voting contract that will allow members to create new proposals.'
    },
    {   
        contractId: 2,
        name: 'Dutch auction',
        description: 'Starts at the highest price set by the seller'
    },
    {   
        contractId: 3,
        name: 'English auction',
        description: 'Starts at a minimum price set by the seller.'
    },
    {   
        contractId: 4,
        name: 'Crowd Fund',
        description: 'The ERC20 SUPER token users will be able to launch a campaign stating their goal.'
    },
]

const Contracts = () => {
  return (
    <>
      <StyledContainer>
          <StyledFlex>
            {contracts.map((contract) => (
                <SmartContractCard
                    key={contract.contractId}
                    name={contract.name}
                    description={contract.description}
                    link={`/contracts/${contract.contractId}`}
                />
            ))}
          </StyledFlex>
        </StyledContainer>
    </>
  )
}

export default Contracts;
