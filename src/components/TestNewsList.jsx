import React, {useEffect, useState} from 'react';
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
const TheNewsList = () => {
    // let skipItems = 0;
    const take = 3;
    // const [take, takeItems] = useState(3);
    const [newsList, setNews] = useState([]);
    const [skip, setSkip] = useState(0);

    const {loading, error, data, fetchMore} = useQuery(GET_NEWS, {
        variables: {skip: skip, take: take},
        notifyOnNetworkStatusChange: true,
    });

    const loadMore = () => {
        setSkip(skip + take);
        fetchMore({
            variables: { skip: skip + take, take },
        });
    };

    useEffect(() => {
        if (data && data.contents) {
            setNews((prevNews) => [...prevNews, ...data.contents]);
        }
    }, [data]);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <nav
                style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <button onClick={loadMore}>Load more</button>
            </nav>
            <ul>
                {newsList.map(news => (
                    <li key={news.id}>
                        <h2>{news.title.short}</h2>
                        <p>{news.description.intro}</p>
                        {news.thumbnail && <img src={news.thumbnail} alt={news.title.short}/>}
                        <p>Posted on: {new Date(news.dates.posted).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
            {loading && <p>Loading more...</p>}
        </div>
    );
};

// Wrap NewsList component with ApolloProvider
const TestNewsList = () => (
        <TheNewsList/>
);

export default TestNewsList;
