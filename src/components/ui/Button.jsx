import styled from 'styled-components';

const colors = {
  primary: '#59acff',
  warning: '#ddff1a',
  danger: '#ff571f',
};

const Button = styled.button`
  color: ${(props) => (props.color ? colors[props.color] : 'palevioletred')};
  cursor: pointer;
  font-size: ${(props) => props.fs ?? '1em'};
  padding: ${(props) => props.p ?? '0.25em 1em'};
  border: 1px solid;
  border-color: ${(props) =>
    props.color ? colors[props.color] : 'palevioletred'};
  border-radius: 3px;
  transition: all 0.09s ease-in-out;

  &:hover {
    scale: 1.03;
  }
`;

export default Button;
