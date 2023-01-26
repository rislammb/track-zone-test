import styled from 'styled-components';
import Input from '../ui/Input';
import Label from '../ui/Label';
import Text from '../ui/Text';

const Group = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputGroup = ({
  name,
  label,
  value,
  type, 
  error,
  onChange,
  onFocus,
  onBlur,
}) => (
  <Group>
    <Label htmlFor={name}>{label}</Label>
    <Input
      value={value}
      name={name}
      type={type}
      id={name}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
    {error && (
      <Text size={'sm'} color={'warning'}>
        {error}
      </Text>
    )}
  </Group>
);

export default InputGroup;
