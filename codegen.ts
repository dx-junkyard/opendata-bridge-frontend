import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema:
    'https://' +
    (process.env.PROMPT_TEMPLATE_DOMAIN || 'localhost:3000') +
    '/graphql',
  documents: 'src/**/*.gql',
  generates: {
    './src/lib/generated/client.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
