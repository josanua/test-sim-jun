import React, { useState, useEffect, useCallback } from 'react';
import {gql, useQuery} from '@apollo/client';


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

const NewsListOldCode = () => {
    const [news, setNews] = useState([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const { loading, error, data, fetchMore } = useQuery(GET_NEWS, {
        variables: { skip: 0, take: 3 },
        notifyOnNetworkStatusChange: true,
    });

    useEffect(() => {
        if (data && data.contents) {
            setNews((prevNews) => [...prevNews, ...data.contents]);
            setSkip((prevSkip) => prevSkip + 3);
            if (data.contents.length < 3) {
                setHasMore(false);
            }
        }
    }, [data]);

    const handleScroll = useCallback(async () => {
        if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 10 || loading || !hasMore) {
            return;
        }
        await fetchMore({
            variables: {
                skip,
                take: 3,
            },
        });
    }, [fetchMore, hasMore, loading, skip]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    if (loading && news.length === 0) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log(news);
    return (
        <div>
            <h1>News List</h1>
            <ul>
                {news.map(newsItem => (
                    <li key={crypto.randomUUID()}>
                        <h2>{newsItem.title.short}</h2>
                        <p>{newsItem.description.intro}</p>
                        {/*{newsItem.thumbnail && <img src={newsItem.thumbnail} alt={newsItem.title.short} />}*/}
                        <p>Posted on: {new Date(newsItem.dates.posted).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
            {loading && <p>Loading more...</p>}
        </div>
    );
};

// Wrap NewsList component with ApolloProvider
const NewsListWithProvider = () => (
        <NewsListOldCode />
);

export default NewsListWithProvider;