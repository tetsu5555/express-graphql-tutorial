var express = require('express');
var graphqlHTTP = require('express-graphql');
var {
    buildSchema
} = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    rollDice(numDice: Int!, numSides: Int): [Int]
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
        return 'Hello world!';
    },
    rollDice: ({numDice, numSides}) => {
        var output = [];
        for (var i = 0; i < numDice; i++) {
            output.push(1 + Math.floor(Math.random() * (numSides || 6)));
        }
        return output;
    },
    quoteOfTheDay: () => {
        return Math.random() < 0.5 ? 'Take is easy' : 'Salvation lies within';
    },
    random: () => {
        return Math.random()
    },
    rollThreeDice: () => {
        // 引数を受け取らない場合は_(アンダースコア)でいけるのか
        return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6))
    },
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    // graphiql: trueを指定することでgraphqlのツールが使えるようになる
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
