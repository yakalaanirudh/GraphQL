import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import DisplayData from "./DisplayData";

function App() {
  const client = new ApolloClient({ 
    cache: new InMemoryCache(),             //To where our cache is stored to prevent unnecessary http requests
    uri: "http://localhost:4000/graphql",   //The link where our GraphQL api is running
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <DisplayData />
      </div>
    </ApolloProvider>
  );
}

export default App;
/*
//import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
ApolloClient is used to communicate between front end and api(graphql)
//We wrap our entire app in ApolloProvider and pass the client inside it
*/