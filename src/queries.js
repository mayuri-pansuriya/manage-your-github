import gql from 'graphql-tag';

export const GET_STARRED_REPOSITORIES = gql`
    query ($number_of_repos: Int!) {
        viewer {
            name
            starredRepositories(last: $number_of_repos) {
                nodes {
                    nameWithOwner
                    id
                }
            }
        }
    }
`

export const GET_SEARCHED_REPOSITORIES = gql`
    query($searchText: String!, $number_of_repos: Int!) {
        search(query: $searchText, type: REPOSITORY, last: $number_of_repos) {
            edges {
                node {
                    ... on Repository {
                        nameWithOwner
                        id
                    }
                }
            }
        }
    }
`

export const UNSTAR_REPO = gql`
    mutation ($id: String!) {
        removeStar(input: {starrableId: $id}) {
            starrable {
                id
            }
        }
    }
`