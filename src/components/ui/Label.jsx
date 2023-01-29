import styled from 'styled-components';

const sizes = {
  sm: '0.8em',
  md: '1em',
  lg: '1.1em',
};

const colors = {
  primary: '#59acff',
  warning: '#ddff1a',
  danger: '#ff5353',
};

const Label = styled.label`
  font-size: ${(props) => (props.size ? sizes[props.size] : '')};
  padding: ${(props) => props.p ?? '4px 0'};
  color: ${(props) => (props.color ? colors[props.color] : '')};
`;

export default Label;
