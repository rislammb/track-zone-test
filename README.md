# Track Zone App

Made by following 'Stack Learner' youtube channel.

## Requirements

- User can set their own time and timezone, this clock can't be deleted only be edited
- User can create as many clock as they want
  - Each clock has their own title or name
  - Own Timezone
  - Simple events with time
  - Time difference between users timezone and clock timezone in hour and minute
- User can edit or delete a clock
- Timezone could be UTC (standard), GMT, PST, EST
- Only date-fns library is allowed for this project, rest of logic should write be yourself
- Every data must be validated

## What to submit?

- A proper breakdown of the requirements
- Component Tree and Data Flow
- Finally, Proper use of components and custom hooks

## For open live

[click](https://fsa-track-zone.netlify.app/)

## Data Structure

- Clock

  - id,
  - title,
  - timeZone,
  - difference

- Event
  - clockId,
  - id,
  - title,
  - datetime
