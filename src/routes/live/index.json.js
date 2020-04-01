const contentful = require('contentful');
const _ = require('lodash');

const client = contentful.createClient({
  space: 'process.env.CONTENTFUL_SPACE_ID',
  accessToken: 'process.env.CONTENTFUL_ACCESS_TOKEN',
});

const categories = [
  'sevenDays',
  'weekdays',
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export async function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  const allData = {};
  for (const category of categories) {
    const data = await client.getEntries({ content_type: category });
    allData[category] = data.items.map(time => {
      return {
        ...time.fields,
      };
    });
  }
  let dataByDay = {};
  for (const day of days) {
    dataByDay[day] = allData[day.toLowerCase()];
    const timeClassPairsToAdd = ['Saturday', 'Sunday'].includes(day)
      ? allData['sevenDays']
      : [...allData['weekdays'], ...allData['sevenDays']];
    for (const pair of timeClassPairsToAdd) {
      const existingTimes = dataByDay[day].map(p => p.time);
      if (existingTimes.includes(pair.time)) {
        dataByDay[day][existingTimes.indexOf(pair.time)].liveClasses = _.unionWith(dataByDay[day][existingTimes.indexOf(pair.time)].liveClasses, pair.liveClasses, _.isEqual);
      } else {
        dataByDay[day].push(pair);
      }
    }
    dataByDay[day] = dataByDay[day].sort(
      (a, b) => a.time.replace(':', '') - b.time.replace(':', ''),
    );
  }
  // console.log(dataByDay);
  res.end(JSON.stringify(dataByDay));
}
