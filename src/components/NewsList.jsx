import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
    // uri: 'https://point.md/graphql',
    uri: 'https://flyby-router-demo.herokuapp.com/',
    cache: new InMemoryCache(),
});

// const client = ...

client
    .query({
        query: gql`
      query GetLocations {
        locations {
          id
          name
          description
          photo
        }
      }
    `,
    })
    .then((result) => console.log(result));

// {
//     contents(
//         project_id: "5107de83-f208-4ca4-87ed-9b69d58d16e1",
//     lang: "ru",
//     skip: 0,
//     take: 10
// ) {
//     id
//     project_id
//     url
//     title {
//         short
//     }
// }
// }

const NewsList = () => {
    return (
        <div>

        </div>
    );
};

export default NewsList;