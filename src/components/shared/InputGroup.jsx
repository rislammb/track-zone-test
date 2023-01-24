import styled from 'styled-components';
import Label from '../../ui/Label';
import Input from '../../ui/Input';
import Text from '../../ui/Text';

const Group = styled.div`
  display: flex; 
  flex-direction: column; 
  gap: 8px; 
  padding: 8px; 
  border: 1px solid #aaa; 
`; 

const InputGroup = ({ name, label, value, error, onChange, onFocus, onBlur }) => (
  <Group>
    <Label htmlFor={name}>{label}<Label>
    <Input value={value} name={name} id={name} onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
    {error && <Text size={'sm'} color={'warning'}>{error}</Text>}
  </Group>
);

export default InputGroup;
