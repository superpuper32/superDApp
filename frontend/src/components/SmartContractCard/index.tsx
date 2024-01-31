import { StyledSmartContractCard } from './SmartContractCard.styled'
import { Link } from 'react-router-dom'

interface SmartContractCardProps {
  key: number;
  name: string;
  link: string;
  description: string;
}

const  SmartContractCard: React.FC<SmartContractCardProps> = ({
  name,
  link,
  description,
}) => {

  return (
    <StyledSmartContractCard>
        <Link to={link}>
            <h3>{name} Contract</h3>
            <p>{description}</p>
        </Link>
    </StyledSmartContractCard>
  );
}

export default SmartContractCard;
