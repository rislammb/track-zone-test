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

const InputGroup = ({ name, label, value, error, handleChange, handleFocus, handleBlur }) => (
  <Group>
    <Label htmlFor={name}><Label>
    <Input value={value} name={name} id={name} handleChange={handleChange} handleFocus={handleFocus} handleBlur={handleBlur} />
    {error && <Text size={'sm'} color={'warning'}>{error}</Text>}
  </Group>
);

export default InputGroup;
