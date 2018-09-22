'use strict';

const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { helloQuery } = require('./queries');
const { mirrorMutation } = require('./mutations');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'List of queries that are supported by this service',
    fields: {
      helloQuery
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    description: 'List of mutations that are supported by this service',
    fields: {
      mirrorMutation
    }
  })
});
