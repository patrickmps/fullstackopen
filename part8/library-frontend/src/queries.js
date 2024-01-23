import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
		published
		genres
		author {
			name
			born
		}
  }
`

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
		}
	}
`;

export const ALL_BOOKS = gql`
	query($genre: String, $author: String) {
		allBooks(genre: $genre, author: $author) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`;

export const ADD_BOOK = gql`
	mutation (
		$title: String!
		$published: Int!
		$author: String!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			published: $published
			author: $author
			genres: $genres
		) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
	mutation ($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			name
			born
		}
	}
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
	query {
  me {
    username
    favoriteGenre
    id
  }
}
`;