import Card from '../ui/Card';
import Title from '../ui/Title';
import Text from '../ui/Text';
import Button from '../ui/Button';

const Clock = ({ adminClock, clock, openModal, deleteClock }) => {
  return clock ? (
    <Card>
      <Title size={'lg'}>Clock</Title>
      <Title size={'sm'}>{clock.title}</Title>
      <Text>{`${clock.timeZone}(${clock.timeZone})`}</Text>

      <Button color={'warning'} onClick={() => deleteClock(clock.id)}>Delete</Button>
      <Button onClick={() => openModal(clock.id)}>Edit</Button>
    </Card>
  ) : (
    <Card>
      <Title size={'lg'}>Clock</Title>
      <Title size={'sm'}>{adminClock.title}</Title>
      <Text>{`${adminClock.timeZone}(${adminClock.timeZone})`}</Text>

      <Button onClick={() => openModal('admin')}>Edit</Button>
    </Card>
  )
}

export default Clock; 
