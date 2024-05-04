const http = require("http");
const dte = require("./datemodule");
const url = require("url");
const fs = require("fs");
const stuff = require("./data");
const login = require("./signin");
const database = new Map([
	['tags', '<a href="https://google.com/" target="_blank">example</a>'],
])
const users = new Map([
	['admin', 'admin'],
	['user1', 'password1'],
])

http.createServer(function (req, res) {
	let qry = url.parse(req.url, true).query;
	if (qry.username !== undefined) {
		if (login.authenticate(qry.username, qry.password, users)) {
			res.writeHead(200, {'Content-Type': 'text/html'});
			console.log('pinged at localhost:8080')
			let files = ['page.html', 'styles.html']
			function read(list) {
			let itr = 0
			const handler = function(err, content) {
				itr++
				if (err) {
					console.log(err)
				} 
				else {
					res.write(content)
				}
				if (itr==list.length) {
					res.end();
				}
			}
			list.forEach((file) => {
				fs.readFile(file, handler);
			})
			}
			read(files);
		} else {
			res.writeHead(200, {'Content-Type': 'text/html'});
			console.log('pinged at localhost:8080')
			let files = ['failed.html', 'styles.html']
			function read(list) {
			let itr = 0
			const handler = function(err, content) {
				itr++
				if (err) {
					console.log(err)
				} 
				else {
					res.write(content)
				}
				if (itr==list.length) {
					res.end();
				}
			}
			list.forEach((file) => {
				fs.readFile(file, handler);
			})
			}
			read(files);
		}
	} else if (qry.search !== undefined) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('you searched for ' + '<strong>' + qry.search + '</strong>' + '<br><br>');
		res.write('<strong>results: </strong>' + '<br>' + stuff.dataget(qry.search,database) + '<br><br>')
		res.write(dte.date() + '<br><br>');
		let files = ['page.html', 'styles.html']
		function read(list) {
		let itr = 0
		const handler = function(err, content) {
			itr++
			if (err) {
				console.log(err)
			} 
			else {
				res.write(content)
			}
			if (itr==list.length) {
				res.end();
			}
		}
		list.forEach((file) => {
			fs.readFile(file, handler);
		})
		}
		read(files);
	} else {
		res.writeHead(200, {'Content-Type': 'text/html'});
		console.log('pinged at localhost:8080')
		let files = ['login.html', 'styles.html']
		function read(list) {
		let itr = 0
		const handler = function(err, content) {
			itr++
			if (err) {
				console.log(err)
			} 
			else {
				res.write(content)
			}
			if (itr==list.length) {
				res.end();
			}
		}
		list.forEach((file) => {
			fs.readFile(file, handler);
		})
		}
		read(files);
	}
}).listen(8080);
console.log('listening at port 8080')
