import styled from 'styled-components';

const sizes = {
  sm: '0.8rem',
  md: '1rem',
  lg: '1.2rem',
};
const paddingSizes = {
  sm: '0.15rem 0',
  md: '0.2rem 0',
  lg: '0.25rem 0',
};

const colors = {
  primary: '#59acff',
  secondary: '#aaa',
  warning: '#ddff1a',
  danger: '#ff5353',
};

const Text = styled.p`
  font-size: ${(props) => (props.size ? sizes[props.size] : sizes['md'])};
  line-height: ${(props) => (props.size ? sizes[props.size] : sizes['md'])};
  padding: ${(props) =>
    props.size ? paddingSizes[props.size] : paddingSizes['md']};
  text-align: ${(props) => props.ta ?? ''};
  color: ${(props) => (props.color ? colors[props.color] : '')};
`;

export default Text;
