import React, { useState } from "react";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";

//The below query is for getting all users
const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;

//The below query is for getting all movies
const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      name
    }
  }
`;

//The below query is for getting one movie
const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

//The below mutation is to create a user
const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

function DisplayData() {
  const [movieSearched, setMovieSearched] = useState("");

  // Create User States
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");

  const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

  //In useLazyQuery in []
  //first parameter is the function fetchMovie
  //the second { data: movieSearchedData, error: movieError } is data if fetched or error if data not fetched from function 
  //We use it fetchMovie function in the button
  //In the query parenthesis we pass the query we want to execute from this hook
  const [fetchMovie,{ data: movieSearchedData, error: movieError },] = useLazyQuery(GET_MOVIE_BY_NAME);

  //createUser is the function we use to add the new data into useMuation Hook which executes CREATE_USER_MUTATION Query
  const [createUser] = useMutation(CREATE_USER_MUTATION);

  //If for users data is still loading it will display this
  if (loading) {
    return <h1> DATA IS LOADING...</h1>;
  }

  return (
    <div>
      <div>
        <input type="text" placeholder="Name..." onChange={(event) => {setName(event.target.value);}}/>
        <input type="text" placeholder="Username..." onChange={(event) => {setUsername(event.target.value);}}/>
        <input type="number" placeholder="Age..." onChange={(event) => {setAge(event.target.value);}}/>
        <input type="text" placeholder="Nationality..." onChange={(event) => {setNationality(event.target.value.toUpperCase());}}/>
        <button onClick={() => {createUser({
              variables: {
                input: { name, username, age: Number(age), nationality },
              },
            });

            refetch();
          }}
        >
          Create User
        </button>
      </div>
      {data && data.users.map((user) => {     //If data is loaded then for each entry of user in users array
          return (
            <div>
              <h1>Name: {user.name}</h1>
              <h1>Username: {user.username}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Nationality: {user.nationality}</h1>
            </div>
          );
        })}

      {movieData &&
        movieData.movies.map((movie) => {
          return <h1>Movie Name: {movie.name}</h1>;
        })}

      <div>
        <input type="text" placeholder="Interstellar..." onChange={(event) => { setMovieSearched(event.target.value);}}/>

      
        <button onClick={() => {fetchMovie({variables: {name: movieSearched,},});}}>Fetch Data</button>
        <div>
          {movieSearchedData && (
            <div>
              <h1>MovieName: {movieSearchedData.movie.name}</h1>
              <h1>
                Year Of Publication: {movieSearchedData.movie.yearOfPublication}
              </h1>{" "}
            </div>
          )}
          {movieError && <h1> There was an error fetching the data</h1>}
        </div>
      </div>
    </div>
  );
}

export default DisplayData;

/*
//useQuery is used to make queries it fetches data whenever the data is rendered
//useMutation is used to make mutations
*/

/*
        <button onClick={() => {fetchMovie({variables: {name: movieSearched,},});}}>Fetch Data</button>

        is used to pass the typed data to the fetch function we pass the variable as movie name that is typed
*/

/*
 <button onClick={() => {createUser({
              variables: {
                input: { name, username, age: Number(age), nationality },
              },
            });

            refetch();
          }}
        >
          Create User
        </button>


        we are passing all the data that is typed into the input fields as variables to createUser function

        then we are rrefetching it so that the data added is readily available on frontend
*/
