import React, {useEffect, useRef, useState} from 'react';
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
        posted: posted(format: "2 $$Jan$$. 15:04", lang: "ru", getDiff: true)
      }
    }
  }
`;


const TheNewsList = () => {
    const take = 10;
    const [newsList, setNews] = useState([]);
    const [skip, setSkip] = useState(0);
    const [isBottom, setIsBottom] = useState(false);
    const scrollPositionRef = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            if (scrollTop >= scrollableHeight) {
                setIsBottom(true);
            } else {
                setIsBottom(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const {loading, error, data, fetchMore} = useQuery(GET_NEWS, {
        variables: {skip, take},
        notifyOnNetworkStatusChange: true,
    });

    const loadMore = () => {
        scrollPositionRef.current = window.scrollY || document.documentElement.scrollTop;

        fetchMore({
            variables: {skip: skip + take, take},
            updateQuery: (prevResult, {fetchMoreResult}) => {
                if (!fetchMoreResult) return prevResult;
                // Remove duplicates
                const existingIds = new Set(prevResult.contents.map(item => item.id));
                const newContents = fetchMoreResult.contents.filter(item => !existingIds.has(item.id));
                return {
                    contents: [
                        ...prevResult.contents,
                        ...newContents,
                    ],
                };
            }
        }).then(() => {
            // Update skip value after successful fetchMore
            setSkip(skip + take);
        });
    };

    useEffect(() => {
        if (isBottom) {
            console.log('bottom');
            loadMore();
        }
    }, [isBottom]);

    useEffect(() => {
        if (data && data.contents) {
            setNews((prevNews) => {
                // Remove duplicates
                const existingIds = new Set(prevNews.map(item => item.id));
                const newContents = data.contents.filter(item => !existingIds.has(item.id));
                return [...prevNews, ...newContents];
            });
            window.scrollTo(0, scrollPositionRef.current);
        }
    }, [data]);

    if (error) return <p>Error: {error.message}</p>;
    console.log(data);
    return (
        <div>
            <NewsListItem newsList={newsList}/>
            {loading && <p>Loading more...</p>}
        </div>
    );
};

const NewsList = () => (
    <TheNewsList/>
);

export default NewsList;
