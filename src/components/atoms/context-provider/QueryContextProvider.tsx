import React from 'react';

type QueryType = { value: string };
type QueryAction = { type: 'update'; payload: QueryType };

const initialQuery = {
  value: '',
} as QueryType;

function queryReducer(state: QueryType, action: QueryAction) {
  switch (action.type) {
    case 'update': {
      return {
        value: action.payload.value,
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export const QueryContext = React.createContext<QueryType>(initialQuery);

export const QueryDispatchContext = React.createContext<
  React.Dispatch<QueryAction> | undefined
>(undefined);

const QueryContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, dispatch] = React.useReducer(queryReducer, initialQuery);

  return (
    <QueryContext.Provider value={query}>
      <QueryDispatchContext.Provider value={dispatch}>
        {children}
      </QueryDispatchContext.Provider>
    </QueryContext.Provider>
  );
};

export default QueryContextProvider;
