const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");

//const schema = require("./schema");
const Schema = require("./schema/schema")

//const URL = "mongodb://localhost:27017/moviesdb";
const URL = "mongodb+srv://Vinodku4848:Vinod123@cluster0.z6zy1tq.mongodb.net/test";

const connect = mongoose.connect(URL, { useNewUrlParser: true , useUnifiedTopology: true});

connect.then(
	db => {
		console.log("Connected correctly to server!");
	},
	err => {
		console.log(err);
	},
);

const server = new ApolloServer({
	schema: Schema,
});



const app = express();

app.use(bodyParser.json());
app.use("*", cors());

server.applyMiddleware({ app });

app.listen({ port: 5000 }, () =>
	console.log(` Server ready at http://localhost:5000${server.graphqlPath}`),
);



// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const { ApolloServer } = require("apollo-server-express");

// // const schema = require("./schema");
// const Schema = require("./schema/schema")

// //const URL = "mongodb://localhost:27017/college";
// const URL = "mongodb+srv://Vinodku4848:Vinod123@cluster0.z6zy1tq.mongodb.net/test";

// const connect = mongoose.connect(URL, { useNewUrlParser: true , useUnifiedTopology: true});
// connect.then(
// 	db => {
// 		console.log("Connected correctly to server!");
// 	},
// 	err => {
// 		console.log(err);
// 	},
// );

// const server = new ApolloServer({
// 	schema: Schema,
	
// });

// const app = express();

// app.use(bodyParser.json());
// app.use("*", cors());

// app.listen({ port: 4000 }, () =>
// 	console.log(` Server ready at http://localhost:4000${server.graphqlPath}`), 
// );
