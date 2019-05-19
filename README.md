# express-graphql-tutorial

https://graphql.org/graphql-js/

## メモ
object typeを返すAPIに対してGraphQLのqueryを発行する時は、GraphQLのfield namesをネストさせることで一度に複数のオブジェクトに定義された関数を呼び出すことができる。

```
{
  getDie(numSides: 6) {
    rollOnce
    roll(numRolls: 3)
  }
}
```

## server2.js

```
{
  getMessage(id: "ここにidを入れる"){
    id
    content
    author
  }
}

mutation {
  createMessage(input: {
    author: "andy",
    content: "hope is good thing"
  }){
    id
    content
    author
	}
}
```