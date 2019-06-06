// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/royalpalace.io/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/royalpalace.io/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/royalpalace.io/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("*", function(request, response, next){
    if(request.secure) {
        response.redirect("https://" + request.headers.host + request.url);
    } else {
        next();
    }
});
app.use("/", express.static(__dirname + '/dist'));


app.get('/', (req, res)=>{
    if(!request.secure){
        response.redirect("https://" + request.headers.host + request.url);
    } else {
        res.sendFile(__dirname + '/dist/index.html');
    }
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

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(3000, () => {
    console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});