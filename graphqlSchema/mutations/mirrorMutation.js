'use strict';

const { GraphQLString, GraphQLNonNull } = require('graphql');

module.exports = {
  type: GraphQLString,
  description: `An mutation which return back input string`,
  args: {
    input: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: (root, args) => args.input
};

