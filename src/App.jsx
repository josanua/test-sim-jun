import './App.css';
import Header from './components/Header';
import Container from './components/styles/Container.styled';
import styled from 'styled-components';
import NewsList from "./components/NewsList";

const Wrapper = styled.section`
  background: #f5f5f5;
    height: 100%;
`;

function App() {
  return (
    <Container>
      <Wrapper>
          <Header />
          <NewsList/>
      </Wrapper>
    </Container>
  );
}

export default App;
