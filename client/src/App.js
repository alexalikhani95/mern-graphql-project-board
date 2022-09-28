import Header from "./components/Header";
// InMemoryCache will prevent having to reload the page to show new added data (e.g a client)
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Clients from "./components/Clients";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
