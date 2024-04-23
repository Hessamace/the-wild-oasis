import styled from "styled-components";
import GlobalStyles from "./styles/gloabalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";

const StyledApp = styled.main`
  background-color: red;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1">The Wild OASIS</Heading>
        <Button>Check in</Button>
        <Button>Check Out</Button>
        <Input placeholder="Enter data" type="number" />
      </StyledApp>
    </>
  );
}

export default App;
