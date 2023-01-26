import styled from 'styled-components';

const colors = {
  primary: '#59acff',
  warning: '#ddff1a',
  danger: '#ff571f',
};

const Span = styled.span`
  font-size: ${(props) => props.fs ?? '13px'};
  padding: ${(props) => props.p ?? ''};
  text-align: ${(props) => props.ta ?? ''};
  color: ${(props) => (props.color ? colors[props.color] : 'inherit')};
`;

export default Span;
