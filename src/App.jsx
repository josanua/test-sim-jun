import './App.css';
import Header from './components/Header';
import Container from './components/styles/Container.styled';
import Wrapper from './components/styles/Wrapper.styled';
import NewsList from "./components/NewsList";


function App() {
  return (
    <Container>
        <Header />
      <Wrapper>
          <NewsList/>
      </Wrapper>
    </Container>
  );
}

export default App;
