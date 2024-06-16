import React, {useState} from 'react';
import { gql, useQuery} from '@apollo/client';


// Define GraphQL query
const GET_NEWS = gql`
  query GetNews($skip: Int!, $take: Int!) {
    contents(
      project_id: "5107de83-f208-4ca4-87ed-9b69d58d16e1",
      lang: "ru",
      skip: $skip,
      take: $take
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

// Define the NewsList component
const NewsList = () => {
    const skipItems = 0;
    // const take = 3;
    const [take, takeItems] = useState(3);

    const {loading, error, data, fetchMore} = useQuery(GET_NEWS, {
        variables: {skip: skipItems, take: take},
        notifyOnNetworkStatusChange: true,
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>News List</h1>
            <nav
                style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <button onClick={() => takeItems((take) => take - 3)}></button>
                <span>Page {take + 1}</span>
                <button onClick={() => takeItems((take) => take + 3)}></button>
            </nav>
            <ul>
                {data.contents.map(news => (
                    <li key={news.id}>
                        <h2>{news.title.short}</h2>
                        <p>{news.description.intro}</p>
                        {news.thumbnail && <img src={news.thumbnail} alt={news.title.short}/>}
                        <p>Posted on: {new Date(news.dates.posted).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Wrap NewsList component with ApolloProvider
const TestNewsListWithProvider = () => (
        <NewsList/>
);

export default TestNewsListWithProvider;
