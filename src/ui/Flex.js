import styled from 'styled-components';

const Flex = styled.div`
  padding: ${props => props.p ?? ''};
  display: flex; 
  flex-direction: ${props => props.fd ?? ''};
  flex-wrap: ${props => props.fw ?? 'wrap'};
  justify-content: ${props => props.jc ?? ''}; 
  align-items: ${props => props.ai ?? ''}; 
  gap: 8px;
`;

export default Flex;
