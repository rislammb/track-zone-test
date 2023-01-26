import styled from 'styled-components';

const Flex = styled.div`
  padding: ${(props) => props.p ?? ''};
  margin: ${(props) => props.m ?? ''};
  display: flex;
  flex-direction: ${(props) => props.fd ?? ''};
  flex-wrap: ${(props) => props.fw ?? 'wrap'};
  justify-content: ${(props) => props.jc ?? 'center'};
  align-items: ${(props) => props.ai ?? ''};
  gap: ${(props) => props.gap ?? '8px'};
`;

export default Flex;
