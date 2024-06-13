import {ApolloClient, ApolloProvider, InMemoryCache, gql, useQuery} from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
    uri: 'https://point.md/graphql',
    cache: new InMemoryCache(),
});

const GET_NEWS = gql`
  {
    contents(
      project_id: "5107de83-f208-4ca4-87ed-9b69d58d16e1",
      lang: "ru",
      skip: 0,
      take: 10
    ) {
      id
      project_id
      url
      title {
        short
      }
      thumbnail
      description {
        intro
        thumbnail
      }
      dates {
        posted
      }
    }
  }
`;

const NewsList = () => {
    const { loading, error, data } = useQuery(GET_NEWS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <ul>
                {data.contents.map(news => (
                    <li key={news.id}>
                        <h2>{news.title.short}</h2>
                        <p>{news.description.intro}</p>
                        {news.thumbnail && <img src={news.thumbnail} alt={news.title.short} />}
                        <p>Posted on: {new Date(news.dates.posted).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Wrap NewsList component with ApolloProvider
const NewsListWithProvider = () => (
    <ApolloProvider client={client}>
        <NewsList />
    </ApolloProvider>
);

export default NewsListWithProvider;