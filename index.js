var express = require('express');
const { Client } = require('pg')
var app = express();
var path = require('path');

app.set('views', './views');
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || '0.0.0.0');
app.use('/static', express.static(path.join(__dirname, 'public')));


console.log(path.join(__dirname, 'public'));

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '12345',
  database:'catalogo'
})

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected');
  }
});



app.get('/jquery_slider', function(req, res){
	res.sendFile('jquery_slider.html', {root: path.join(__dirname, 'views')});
});


app.get('/', function(req, res){
	res.sendFile('index.html', {root: path.join(__dirname, 'views') });
});


app.get('/grid_system', function(req, res){
	res.sendFile('grid_system.html', {root: path.join(__dirname, 'views') });
});


app.get('/profissionais', function(req, res){



	client.query("SHOW client_encoding", (err, empty_result_to_fix_encoding) => {
		console.log(empty_result_to_fix_encoding);
		client.query('SELECT * from profissional where nome ilike \'%ramiro%\'', (err, resDB) => {
		  if (err) throw err
		  console.log(resDB['rows'][0]['nome']);	  
		  res.render('profissionais_template', {
		  	profissionais:resDB['rows']
		  })
		});

	});

});

app.get('/filmes', function(req, res){

	client.query('SELECT * from filme', (err, resDB) => {
	  if (err) throw err
	  console.log(resDB['rows']);	  
	  res.render('filmes_template', {
	  	filmes:resDB['rows']
	  })
	});

});

app.listen(app.get('port'), app.get('host'),function(){
  console.log('App de Exemplo escutando na porta 3000!');
});
