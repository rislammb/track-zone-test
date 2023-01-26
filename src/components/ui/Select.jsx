import styled from 'styled-components';

const Select = styled.select`
  color: #ff91b6;
  font-size: 1em;
  border: 1px solid #ff91b6;
  outline: none;
  border-radius: 3px;
  padding: ${(props) => props.p ?? '4px 8px'};
  margin: ${(props) => props.m ?? ''};
`;

export default Select;
