import React, { useEffect, useState } from 'react';
import client from '../apollo';
import { GET_STARRED_REPOSITORIES, GET_SEARCHED_REPOSITORIES, UNSTAR_REPO } from '../queries';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider, useQuery, useMutation } from 'react-apollo-hooks';
import { get } from 'lodash';

const ApolloProv = () => {
    return (
        <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
                <AllRepos />
                <SearchRepos />
            </ApolloHooksProvider>
        </ApolloProvider>
    )
}

const AllRepos = () => {
    const [starredRepo, setStarredRepo] = useState([]);
    const { loading, error, data } = useQuery(GET_STARRED_REPOSITORIES, {
        variables: { number_of_repos: 100 },
    });
    const [unstar] = useMutation(UNSTAR_REPO);

    useEffect(() => {
        setStarredRepo(get(data, 'viewer.starredRepositories.nodes', []))
    }, [data])

    if (loading) return <React.Fragment>Loading..</React.Fragment>
    if (error) return <React.Fragment>Error Occurred</React.Fragment>

    const unstarRepo = (sr) => {
        // console.log("TCL: unstarRepo -> sr", sr)
        unstar({ variables: { id: sr.id } });
    }

    return (
        <div>
            <div>Starred Repo:</div>
            {starredRepo.map(sr => <div>
                - {sr.nameWithOwner}
                <button onClick={e => unstarRepo(sr)}>Unstar Repo</button>
            </div>)}
        </div>
    )
}

const SearchRepos = () => {
    const [searchText, setSearchText] = useState("");
    const [searchedRepo, setSearchedRepo] = useState([]);
    const { data } = useQuery(GET_SEARCHED_REPOSITORIES, {
        variables: {
            searchText: searchText,
            number_of_repos: 100
        },
    });
    useEffect(() => {
        let fetchedData = get(data, 'search.edges', []);
        if (fetchedData !== searchedRepo) setSearchedRepo(fetchedData);
    }, [data])

    const changeSearchText = (value) => { setSearchText(value) };

    return (
        <React.Fragment>
            <input value={searchText} onInput={e => changeSearchText(e.target.value)} />
            {
                searchedRepo.map(sr => <div>{sr.node.nameWithOwner}</div>)
            }
        </React.Fragment>
    )

}
export default ApolloProv;