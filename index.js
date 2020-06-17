const { ApolloServer } = require("apollo-server")

const typeDefs = `

    type Item {
        id: Int
        type: String
        description: String
    }

    input inputItem{
        type: String
        description: String
    }

    input idItem{
        id: Int
        type: String
    }

    type Query {
        prefixes: [Item]
        sufixes: [Item]
    }

    type Mutation {
        saveItem(data: inputItem!): Item
        deleteItem(data: idItem!): Item
    }

`

const prefixes = [
    { id: 1, type: "prefix", description: "Air" },
    { id: 2, type: "prefix", description: "Jet" },
    { id: 3, type: "prefix", description: "Flight" },
]

const sufixes = [
    { id: 1, type: "sufix", description: "Hub" },
    { id: 2, type: "sufix", description: "Station" },
    { id: 3, type: "sufix", description: "Mart" },
]

const resolvers = {
    Query: {
        prefixes(){
            return prefixes
        },
        sufixes(){
            return sufixes
        }
    },
    Mutation: {
        saveItem(_, { data }){
            if(data.type == "prefix"){
                const { type, description } = data
                const lastElement = prefixes[prefixes.length - 1]
                const id = lastElement.id + 1
                const newElement = { id, type, description }
                prefixes.push(newElement)
                return newElement
            }else if(data.type == "sufix"){
                const { type, description } = data
                const lastElement = sufixes[sufixes.length - 1]
                const id = lastElement.id + 1
                const newElement = { id, type, description }
                sufixes.push(newElement)
                return newElement
            }
        },
        deleteItem(_, { data }){
            if(data.type == "prefix"){
                for(var x=0;x<=prefixes.length;x++){
                    if(prefixes[x].id == data.id){
                        var deletedItem = prefixes[x]
                        prefixes.splice(x, 1)
                        return deletedItem
                    }
                }
            }else if(data.type == "sufix"){
                for(var x=0;x<=sufixes.length;x++){
                    if(sufixes[x].id == data.id){
                        var deletedItem = sufixes[x]
                        sufixes.splice(x, 1)
                        return deletedItem
                    }
                }
            }
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen(3333)