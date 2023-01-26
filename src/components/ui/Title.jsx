import styled from 'styled-components';

const sizes = {
  sm: '1.3rem',
  md: '1.7rem',
  lg: '2.1rem',
  xl: '2.5rem',
};

const colors = {
  primary: '#59acff',
  warning: '#ddff1a',
  danger: '#ff571f',
};

const Title = styled.h1`
  font-size: ${(props) => (props.size ? sizes[props.size] : sizes['md'])};
  padding: ${(props) => props.p ?? '8px 6px'};
  text-align: center;
  color: ${(props) => (props.color ? colors[props.color] : '')};
`;

export default Title;
