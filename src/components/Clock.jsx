import useClock from '../hooks/useClock';
import Card from '../ui/Card';
import Flex from '../ui/Flex';
import Title from '../ui/Title';
import Text from '../ui/Text';
import Button from '../ui/Button';

const Clock = ({ adminClock, clock, openModal, deleteClock }) => {
  const { state, addEvent, editEvent, deleteEvent, openModal: openEventModal, closeModal } = useClock();
 
  return (
    <Card>
      <Title size={'lg'}>03:45 pm</Title>
      <Title size={'sm'}>{clock ? clock.title : adminClock.title}</Title>
      <Text>{`${clock ? clock.timeZone : adminClock.timeZone}(${clock ? clock.difference : adminClock.difference})`}</Text>
      <Flex jc={'end'}>
        {clock && <Button color={'warning'} onClick={() => deleteClock(clock.id)}>Delete</Button>}
        <Button onClick={() => openModal(clock ? clock.id : 'admin')}>Edit</Button>
      </Flex>
      <br />
      <Flex jc={'space-between'} ai={'center'}>
        <Title size={'sm'}>Events:</Title>
        <Button onClick={openEventModal}>Add Event</Button>
      </Flex>
      {state.open && <Button onClick={closeModal}>Close</Button>}
    </Card>
  )
}

export default Clock; 
