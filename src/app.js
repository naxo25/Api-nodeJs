const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'), 'layouts'),
	partialsDir: path.join(app.get('views'), 'partials'),
	extname: '.hbs',
	helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));


app.post('')

//global

//routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));
app.use('/imagen', require('./routes/imagen'));
app.use('/backendnode', require('./routes/backendnode'));

app.listen(app.get('port'), () => {
	console.log('server', app.get('port'));
})