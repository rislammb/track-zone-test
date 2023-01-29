import styled from 'styled-components';

const colors = {
  primary: '#59acff',
  warning: '#ddff1a',
  danger: '#ff5353',
};

const Hr = styled.p`
  height: 1px;
  background-color: ${(props) =>
    props.color ? colors[props.color] : '#4a4a4a'};
  margin: ${(props) => props.m ?? '0.2rem 0'};
`;

export default Hr;
