import styled from 'styled-components';

const sizes = {
  sm: '1.3rem',
  md: '1.6rem',
  lg: '2rem',
  xl: '2.5rem',
};

const paddingSizes = {
  sm: '0.2rem 0',
  md: '0.25rem 0',
  lg: '0.3rem 0',
  xl: '0.35rem 0',
};

const colors = {
  primary: '#59acff',
  warning: '#ddff1a',
  danger: '#ff5353',
};

const Title = styled.h1`
  font-size: ${(props) => (props.size ? sizes[props.size] : sizes['md'])};
  line-height: ${(props) => (props.size ? sizes[props.size] : sizes['md'])};
  padding: ${(props) =>
    props.size ? paddingSizes[props.size] : paddingSizes['md']};
  text-align: center;
  color: ${(props) => (props.color ? colors[props.color] : '')};
`;

export default Title;
