import gql from 'graphql-tag';

export const GET_STARRED_REPOSITORIES = gql`
    query ($number_of_repos: Int!) {
        viewer {
            name
            starredRepositories(last: $number_of_repos) {
                nodes {
                    nameWithOwner
                }
            }
        }
    }
`