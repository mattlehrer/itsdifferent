// const contentful = require('contentful');

// const client = contentful.createClient({
//   space: 'process.env.CONTENTFUL_SPACE_ID',
//   accessToken: 'process.env.CONTENTFUL_ACCESS_TOKEN',
// });
// client
//   .getEntries({ content_type: 'times' })
//   // .then(response => console.log(response.items))
//   .catch(console.error);

// // const lookup = new Map();
// // classes.forEach(cls => {
// // 	lookup.set(cls.slug, JSON.stringify(cls));
// // });

// export function get(req, res, next) {
//   // the `slug` parameter is available because
//   // this file is called [slug].json.js
//   const { slug } = req.params;
//   res.writeHead(200, {
//     'Content-Type': 'application/json',
//   });

//   res.end(slug);
//   // if (lookup.has(slug)) {
//   // 	res.writeHead(200, {
//   // 		'Content-Type': 'application/json'
//   // 	});

//   // 	res.end(lookup.get(slug));
//   // } else {
//   // 	res.writeHead(404, {
//   // 		'Content-Type': 'application/json'
//   // 	});

//   // 	res.end(JSON.stringify({
//   // 		message: `Not found`
//   // 	}));
//   // }
// }
