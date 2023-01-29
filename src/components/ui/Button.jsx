import styled from 'styled-components';

const colors = {
  primary: '#59acff',
  warning: '#ddff1a',
  danger: '#ff6363',
};

const Button = styled.button`
  color: ${(props) => (props.color ? colors[props.color] : '#ff91b6')};
  cursor: pointer;
  font-size: ${(props) => props.fs ?? '0.95rem'};
  padding: ${(props) => props.p ?? '0.25rem 0.9rem'};
  border: 1px solid;
  border-color: ${(props) => (props.color ? colors[props.color] : '#ff91b6')};
  border-radius: 3px;
  transition: all 0.13s ease-in-out;
  background-color: inherit;

  &:hover {
    scale: 1.03;
  }
`;

export default Button;
