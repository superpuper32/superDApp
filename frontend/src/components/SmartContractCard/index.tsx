import { StyledSmartContractCard } from './SmartContractCard.styled'
import { Link } from 'react-router-dom'

interface SmartContractCardProps {
  name: string;
  link: string;
}

const  SmartContractCard: React.FC<SmartContractCardProps> = ({ name, link }) => {

  return (
    <StyledSmartContractCard>
        <Link to={link}>
            <h3>{name} Contract</h3>
            <p>Description</p>
        </Link>
    </StyledSmartContractCard>
  )
}

export default SmartContractCard;