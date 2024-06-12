import './App.css';
import Header from './Header';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 4em;
  background: #f5f5f5;
    height: 100%;
`;

function App() {
  return (
    <div className="App">
      <Wrapper>
          <Header />
      </Wrapper>
    </div>
  );
}

export default App;
