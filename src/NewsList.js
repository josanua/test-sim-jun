import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://point.md/graphql',
    cache: new InMemoryCache(),
});

const NewsList = () => {
    return (
        <div>

        </div>
    );
};

export default NewsList;