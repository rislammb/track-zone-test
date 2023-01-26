import styled from 'styled-components';

const sizes = {
  sm: '20px',
  md: '26px',
  lg: '34px',
  xl: '40px',
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
