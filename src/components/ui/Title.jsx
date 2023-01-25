import styled from 'styled-components';

const sizes = {
  sm: '1.2em',
  md: '1.4em',
  lg: '1.6em',
};

const colors = {
  primary: '#59acff',
  warning: '#ddff1a',
  danger: '#ff571f',
};

const Title = styled.h1`
  font-size: ${(props) => (props.size ? sizes[props.size] : '1.4em')};
  padding: ${(props) => props.p ?? '8px 6px'};
  text-align: center;
  color: ${(props) => (props.color ? colors[props.color] : '')};
`;

export default Title;
