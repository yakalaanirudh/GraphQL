type User{
    id: ID!
    name: String!
    age: Int!
    height: float!
    isMarried: Boolean
    friends: [User]
    videosPosted: [Video]
}


type Video{
    id: ID!
    title: String!
    description: String!
}

//In GraphQL there are 5 data types ID, String, int, float, Boolean
//We can aslo give hybrid data types like User is a data type after defining it like we did above.
/*
GraphQL allows a fields value to be  a type or null 
! tells us that that field is required and should not be null
In the above object isMarried property is not mandatory to have a value
friends: [User]
A person need not have friends so no ! like [User!]

But if we want the array to be required as well we can do [User]!

Simply
[User]!  Array compulsory
[User!] Friends not required but if there are dispaly them
*/

input UserInput{
    id:ID
    name:String
}


type Query{
    users:[User]            //This query returns users in a list
    user(id:ID):User        //This query return the user whose Id matches
    user(id:ID, name:String):User        //This query return the user whose Id,name matches
    user(input:UserInput):User        //This query return the user input matches the above easier
}

type Query {
    continents(filter:ContinentFilterInput): [Continent!]!      //returns list of continents
    continent(code:ID!): Continent                              //returns the continent
    countries(filter: CountryFilterInput): [Country!]!          //returns list of countries
    country(code: ID!): Country                                 //returns the country
    languages(filter: LanguageFilterInput): [Language!]!
    language(code: ID!): Language
}    


//Example 1
query {
    country(code:"US"){         //Below we specify the properties we need from country object
      code
      name
      phone
      capital
      currency
    }
}


{ 
    "data": {
      "country": {
        "code": "US",
        "name": "United States",
        "phone": "1",
        "capital": "Washington D.C.",
        "currency": "USD,USN,USS"
      }
    }
}

  

//Example 2
query {
    country(code:"US"){
      code
      name
      phone
      capital
      currency
      continent{    //Adding what properties we need from continent
        code
        name
        countries{      //Adding what properties we need from country
          name
        }
      }
    }
}



{
    "data": {
      "country": {
        "code": "US",
        "name": "United States",
        "phone": "1",
        "capital": "Washington D.C.",
        "currency": "USD,USN,USS",
        "continent": {
          "code": "NA",
          "name": "North America",
          "countries": [
            {
              "name": "Antigua and Barbuda"
            },
            {
              "name": "Anguilla"
            },
            {
              "name": "Aruba"
            },
            {
              "name": "Barbados"
            }
          ]
        }
      }
    }
}



//Example 3
//country returns a country
//In country we seek code name phone capital currency continent(object)
//In continenet we seek code name and country list(country)
//For each entry of the list we seek name and capital
query {
    country(code:"US"){
      code
      name
      phone
      capital
      currency
      continent{
        code
        name
        countries{
          name
          capital
        } 
      }
    }
}



{
    "data": {
      "country": {
        "code": "US",
        "name": "United States",
        "phone": "1",
        "capital": "Washington D.C.",
        "currency": "USD,USN,USS",
        "continent": {
          "code": "NA",
          "name": "North America",
          "countries": [
            {
              "name": "Antigua and Barbuda",
              "capital": "Saint John's"
            },
            {
              "name": "Anguilla",
              "capital": "The Valley"
            },
            {
              "name": "Aruba",
              "capital": "Oranjestad"
            }
          ]
        }
      }
    }
}


//Example 4
//languages return a list of language
//In each language we seek code,name,native,rtl
query {
    languages{
      code
      name
      native
      rtl
    }
}
    

{
    "data": {
      "languages": [
        {
          "code": "af",
          "name": "Afrikaans",
          "native": "Afrikaans",
          "rtl": false
        },
        {
          "code": "am",
          "name": "Amharic",
          "native": "አማርኛ",
          "rtl": false
        },
        {
          "code": "ar",
          "name": "Arabic",
          "native": "العربية",
          "rtl": true
        }]
    }
}  