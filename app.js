// const express = require('express');
// const app = express();
// const path = require('path');
// const fetch = require('node-fetch');
// const PORT = process.env.PORT || 8000;

// app.use(express.static("dist"));

// app.get("/", (request, res) => {
// 	res.sendFile(path.join(__dirname, "./dist/index.html"));
// });

// //Get prices for flights
// app.get('/prices/:isbn', (req, res) => {
// 	//make api call using fetch
// 	fetch(
// 		//api link here
// 	)
// 		.then(res => {
// 		return res.text();
// 	})
// 		.then(body => {
// 			let results = JSON.parse(body);
// 			console.log(results);
// 			res.send(results);
// 		})
// })

// //create a search route
// app.get("/search", (req, res) => {
// 	//fetch(add api link here)
// 		.then(res => {
// 			return res.text()
// 		})
// 		.then(body => {
// 			let results = JSON.parse(body);
// 			console.log(results);
// 			res.send(results)
// 		})
// })

// app.listen(PORT, () => {
// 	console.log(__dirname);
// 	console.log(`listening on ${PORT}`);
// })