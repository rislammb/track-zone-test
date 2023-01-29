import styled from 'styled-components';

const colors = {
  primary: '#59acff',
  warning: '#ddff1a',
  danger: '#ff5353',
};

const Span = styled.span`
  font-size: ${(props) => props.fs ?? '0.9rem'};
  padding: ${(props) => props.p ?? ''};
  text-align: ${(props) => props.ta ?? ''};
  color: ${(props) => (props.color ? colors[props.color] : 'inherit')};
`;

export default Span;
