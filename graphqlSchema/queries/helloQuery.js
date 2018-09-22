'use strict';

const { GraphQLString } = require('graphql');

module.exports = {
  type: GraphQLString,
  description: `An hello query`,
  args: {},
  resolve: (root, args) => 'Hello from GraphQL Query'
};
