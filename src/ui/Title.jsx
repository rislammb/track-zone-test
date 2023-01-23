import styled from 'styled-components';

const sizes = {
  sm: '1.2em',
  md: '1.4em',
  lg: '1.6em'
};

const Title = styled.h1`
  font-size: ${props => sizes[props.size]};
  text-align: center;
  color: palevioletred;
`;

export default Title;
