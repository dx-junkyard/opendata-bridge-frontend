import { GraphQLClient } from 'graphql-request';

export const gqlClient = new GraphQLClient(
  'https://' +
    (process.env.PROMPT_TEMPLATE_DOMAIN || 'localhost:3000') +
    '/graphql',
  {
    headers: {
      authorization: `Bearer ${process.env.CMS_READ_TOKEN}`,
    },
  }
);
