import { Waypoint } from 'react-waypoint';
import React, { useState, useEffect, useCallback } from 'react';
import {ApolloClient, ApolloProvider, InMemoryCache, gql, useQuery} from '@apollo/client';


// Initialize Apollo Client
const client = new ApolloClient({
    uri: 'https://point.md/graphql',
    cache: new InMemoryCache(),
});

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

const TestScroll = () => {
    return (
        <div>
            {news.map(newsItem => (
                <Waypoint onEnter={()=> console.log(newsItem.id)}></Waypoint>
            ))}
        </div>
    )
}

export default TestScroll;