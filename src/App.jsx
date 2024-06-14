import './App.css';
import Header from './components/Header';
import NewsListWithProvider from './components/NewsList';
import Container from './components/styles/Container.styled';
import styled from 'styled-components';
import TestNewsListWithProvider from "./components/TestNewsListWithProvider";


const Wrapper = styled.section`
  background: #f5f5f5;
    height: 100%;
`;

function App() {
  return (
    <Container>
      <Wrapper>
          <Header />
          {/*<NewsListWithProvider/>*/}
          <TestNewsListWithProvider/>
      </Wrapper>
    </Container>
  );
}

export default App;
