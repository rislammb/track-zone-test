import Button from '../ui/Button';
import Flex from '../ui/Flex';
import Text from '../ui/Text';

const Event = ({ clockId, event, openModal, deleteEvent }) => {
  return (
    <Flex fd={'column'}>
      <Text color={'warning'}>{event.title}</Text>

      <Flex jc={'space-between'} ai={'center'}>
      <Flex fd={'column'}>
      <Text p={'0px'} size={'sm'}>
        {event.date}, {event.time}
      </Text>
      <Text p={'0px'} size={'sm'}>
        Time from admin clock:
      </Text>
      </Flex>
      <Flex>
        <Button
          onClick={() => deleteEvent(event.id)}
          fs={'13px'}
          p={'3px 8px'}
          color={'danger'}
        >
          Delete
        </Button>
        <Button onClick={() => openModal('event', clockId, event.id)} fs={'13px'} p={'3px 8px'}>
          Edit
        </Button>
      </Flex>
      </Flex>
    </Flex>
  );
};

export default Event;
