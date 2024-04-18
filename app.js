const express = require('express');
const app = express();
const colors = require('colors');
const data = require('./data.json');
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
	  res.send('Hello World');
});

app.use((req, res, next) => {
	let method = '';
	switch (req.method) {
		case 'GET':
			method = colors.green(req.method);
			break;
		case 'POST':
			method = colors.yellow(req.method);
			break;
		case 'PUT':
			method = colors.blue(req.method);
			break;
		case 'DELETE':
			method = colors.red(req.method);
			break;
		default:
			method = colors.white(req.method);
	}
	console.log(`${ new Date().toLocaleString("fr-FR") } - ${ method } - ${ req.url }`);
	next();
});

app.get("/api/user/all", (req, res) => {
	res.send(data.users);
});

app.get("/api/user/:id", (req, res) => {
	const id = req.params.id;
	const user = data.users.find(user => user.id === id);
	res.send(user);
});

app.post("/api/user", (req, res) => {
	const user = req.body;
	user.id = data.users.length + 1;
	data.users.push(user);
	res.send(user);
});

app.put("/api/user/:id", (req, res) => {
	const id = req.params.id;
	const user = req.body;
	const index = data.users.findIndex(user => user.id === id);
	data.users[index] = user;
	res.send(user);
});

app.delete("/api/user/:id", (req, res) => {
	const id = req.params.id;
	const index = data.users.findIndex(user => user.id === id);
	data.users.splice(index, 1);
	res.send(data.users);
});

app.get("/api/product/all", (req, res) => {
	res.send(data.products);
});

app.get("/api/product/:id", (req, res) => {
	const id = req.params.id;
	const product = data.products.find(product => product.id === id);
	res.send(product);
});

app.post("/api/product", (req, res) => {
	const product = req.body;
	product.id = Math.random().toString(36).substr(2, 9);
	data.products.push(product);
	res.send(product);
});

app.put("/api/product/:id", (req, res) => {
	const id = req.params.id;
	const product = req.body;
	const index = data.products.findIndex(product => product.id === id);
	data.products[index] = product;
	res.send(product);
});

app.delete("/api/product/:id", (req, res) => {
	const id = req.params.id;
	const index = data.products.findIndex(product => product.id === id);
	data.products.splice(index, 1);
	res.send(data.products);
});


app.listen(3000, () => {
	console.log("Serveur à l'écoute sur le port 3000");
});