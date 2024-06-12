import './App.css';
import NewsList from './Header';
import Header from './NewsList';
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
          <NewsList />
      </Wrapper>
    </div>
  );
}

export default App;
