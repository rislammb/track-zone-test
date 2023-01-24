import styled from 'styled-components';

const sizes = {
  sm: '0.8em',
  md: '1em',
  lg: '1.1em'
};

const Text = styled.p`
  font-size: ${props => props.size ? sizes[props.size] : '1em'};
  padding: 8px;
`;

export default Text;
