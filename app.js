var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/index', function (req, res) {
    res.render('index', {title:'Welcome'});
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.get('/contact', function (req, res) {
    res.render('contact');
});

app.post('/contact/send', function (req, res){
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'denniskestone@gmail.com',
            pass: 'Dennis123kestone'
        }
    });

    var mailOptions = {
        from: 'dennis kestone <denniskestone@gmail.com>',
        to: 'denniskestone@gmail.com',
        subject: 'Website Submission',
        text: 'You have a submission with the following details...Name:'+req.body.name+' Email:'+req.body.Email+' Message: '+req.body.message,
        html: '<p> You have a submission with the following details...</p><ul><li>Name:'+req.body.name+'</li><li>Email:'+req.body.Email+'</li><li>Message:'+req.body.message+'</li></ul>' 
     };
     transporter.sendMail(mailOptions, function(error, info){
         if(error){
             console.log(error);
             res.redirect('/index');
         } else {
                console.log('Message sent:' +info.response);
                res.render.alert("sent succesfully");
                res.redirect('/index');
         }
     });
     console.log('sent');
});

app.listen(2000);
console.log("server is running");