var app = require('express')();
var bodyParser = require('body-parser');
var path = require('path');
var mysql=require('mysql')

var io = require('socket.io').listen(3000)
// Define our db creds
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'login'
})
 
// Log any errors connected to the db
db.connect(function(err){
if(err) {
	 console.log(err);  
   
} else {
	 console.log("Database is connected ... \n\n");  
   
}
})


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'form.html'));
});

app.post('/', function(req, res) {
    console.log(req.body.firstname);
    console.log(req.body.email);

    var post={

    	name: req.body.firstname,
    	email:req.body.email
    };

   
    db.query('INSERT INTO Users SET?',post, function(err, result)
    {if(err) {
	 console.log(err);  
   
} else {
	 console.log("Values added ... \n\n");  
	 res.send("Added");
   
}});

    var selectQuery = 'SELECT * FROM Users';
db.query(
    selectQuery,
    function select(error, results, fields) {
        if(error) {
            console.log(error);
            
            return;
        }

        if(results.length > 0) {
            console.log(results);
        } else {
            console.log('No data');
        }
    
    });
    
});

app.listen(8080);