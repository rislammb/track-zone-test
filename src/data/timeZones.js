const timeZones = [
  {
    name: 'UTC',
    value: { title: 'UTC', minutes: 0 },
  },
  {
    name: 'GMT',
    value: { title: 'GMT', minutes: 0 },
  },
  {
    name: 'EST',
    value: { title: 'EST', minutes: -(5 * 60) },
  },
  {
    name: 'PST',
    value: { title: 'PST', minutes: -(8 * 60) },
  },
  {
    name: 'IST',
    value: { title: 'IST', minutes: 5 * 60 + 30 },
  },
];

export default timeZones;
