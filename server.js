//install express server 
const express = require('express'),
    pat = require('path');

const app = express();

//Serve only the static files form the dist directory
app.use(express.static('./dist/blog-angular'));

app.get('/*', (req,res)=>{
    res.sendFile(path.join(__dirname,'/dist/blog-angular/index.html'));
});

// start the app by listening on the default Heroku port
app.listen(precess.env.PORT || 8080, ()=>{
    console.log('Server Started');
});