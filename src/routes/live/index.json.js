import classes from './_classes.js';

const contents = JSON.stringify(classes.map(cls => {
	return {
		title: cls.title,
    slug: cls.slug,
    time: cls.time,
    days: cls.days,
	};
}));

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}