const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLList,
    GraphQLString,
    GraphQLBoolean
} = require("graphql");

const GraphQLGroceryList = new GraphQLObjectType({
    name: "GroceryList",
    fields: {
        listName: { type: GraphQLString }
    }
});

function getGroceryList(listId) {
    return {
        listName: "Workshop List"
    };
}

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "RootGraphQL",
        fields: {
            groceryList: {
                args: {
                    listId: {
                        name: "listId",
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                type: GraphQLGroceryList,
                resolve: (parent, args) => getGroceryList(args.listId)
            }
        }
    })
});

exports.schema = schema;
