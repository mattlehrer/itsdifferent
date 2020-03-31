const contentful = require('contentful');

const client = contentful.createClient({
  space: 'process.env.CONTENTFUL_SPACE_ID',
  accessToken: 'process.env.CONTENTFUL_ACCESS_TOKEN',
});

export async function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  const data = await client.getEntries({ content_type: 'recordedClass' });

  // console.log(data.items);
  res.end(JSON.stringify(data.items));
}
