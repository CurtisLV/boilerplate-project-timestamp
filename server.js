// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date?', (req, res) => {
    let date = req.params.date; // vnk inputs, poh kāds
    let dateVal; //formāts, ko var lietot

    if (!isNaN(date)) {
        date = new Date(parseInt(date));
    }

    if (!date) {
        // ja nav nekā
        date = new Date(); // tad iedodam tagad laiku
    }

    dateVal = new Date(date);

    if (dateVal.toString() === 'Invalid Date') {
        return res.json({ error: dateVal.toString() });
    }

    let dateString = dateVal.toUTCString();
    let dateUnix = Date.parse(dateVal);
    res.json({ unix: dateUnix, utc: dateString });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
