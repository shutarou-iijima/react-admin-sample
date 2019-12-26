const express = require('express');
const cors = require('cors');
const bookRouter = require('./router/book_router');
const memberRouter = require('./router/member_router');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!!'));
app.use('/', bookRouter);
app.use('/', memberRouter);

app.listen(8080, () => console.log('Example app listening on port 8080!'));
