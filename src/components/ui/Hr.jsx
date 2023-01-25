import styled from 'styled-components';

const colors = {
  primary: '#59acff',
  warning: '#ddff1a',
  danger: '#ff571f',
};

const Hr = styled.hr`
  border-color: ${(props) => (props.color ? colors[props.color] : '#7a7a7a')};
`;

export default Hr;
