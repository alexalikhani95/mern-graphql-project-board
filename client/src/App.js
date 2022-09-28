import Header from "./components/Header";
// InMemoryCache will prevent having to reload the page to show new added data (e.g a client)
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

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
          <h1>Hello</h1>
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
