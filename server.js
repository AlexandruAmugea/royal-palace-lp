const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Any request to / will go in dist folder
app.use("/", express.static(__dirname + '/dist'));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/dist/index.html');
});

app.post('/api/register', (req, res) => {
    const email = `${req.body.email},`;
    fs.readFile("adresses.txt", "utf-8", function(err, data) {
        if(err) {
            return console.log(err);
        }
        if(data.includes(email)) {
            res.json({status: 400, msg: "Already registered"});
        } else {
            fs.appendFile('adresses.txt', email, function(err){
                if(err) {
                    return console.log(err)
                }
                res.json({status: 200, msg: "Registered"});
            });
        }
    });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));