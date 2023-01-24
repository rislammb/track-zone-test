import styled from 'styled-components';

const Modal = styled.div`
  padding: ${props => props.p ? `${props.p * 8}px` : '8px'};
  width: 100vw; 
  height: 100vh; 
  z-index: 2;
  background: rgba(255, 255, 255, 0.3);
`;

export default Modal;