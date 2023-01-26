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
    name: 'IST',
    value: { title: 'IST', minutes: 5 * 60 + 30 },
  },
  {
    name: 'PST',
    value: { title: 'PST', minutes: -(8 * 60) },
  },
];

export default timeZones;
