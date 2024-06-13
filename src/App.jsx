import './App.css';
import Header from './components/Header';
import NewsListWithProvider from './components/NewsList';
import styled from 'styled-components';


const Wrapper = styled.section`
  background: #f5f5f5;
    height: 100%;
`;

function App() {
  return (
    <div className="App">
      <Wrapper>
          <Header />
          <NewsListWithProvider />
      </Wrapper>
    </div>
  );
}

export default App;
