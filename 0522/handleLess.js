let less = require('less'),
	fs = require('fs');

less.render(fs.readFileSync('./less/1.less', 'utf-8'), (err, result) => {
	fs.writeFileSync('./css/1.css', result.css, 'utf-8');
});