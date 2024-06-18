import React, {useEffect, useState} from 'react';
import {gql, useQuery} from '@apollo/client';
import NewsListItem from "./NewsListItem";


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
    const take = 3;
    const [newsList, setNews] = useState([]);
    const [skip, setSkip] = useState(0);

    const {loading, error, data, fetchMore} = useQuery(GET_NEWS, {
        variables: {skip: skip, take: take},
        notifyOnNetworkStatusChange: true,
    });

    const loadMore = () => {
        setSkip(skip + take);
        fetchMore({
            variables: {skip: skip + take, take},
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
            <button onClick={loadMore}>Load more</button>
            <NewsListItem newsList={newsList}/>
            {loading && <p>Loading more...</p>}
        </div>
    );
};

const NewsList = () => (
    <TheNewsList/>
);

export default NewsList;
