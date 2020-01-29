import React, { useEffect, useState } from 'react';
import client from '../apollo';
import { GET_STARRED_REPOSITORIES } from '../queries';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider, useQuery } from 'react-apollo-hooks';
import { get } from 'lodash';

const ApolloProv = () => {
    return (
        <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
                <AllRepos />
            </ApolloHooksProvider>
        </ApolloProvider>
    )
}

const AllRepos = () => {
    const [starredRepo, setStarredRepo] = useState([]);
    const { loading, error, data } = useQuery(GET_STARRED_REPOSITORIES, {
        variables: { number_of_repos: 100 },
    });
    useEffect(() => {
        setStarredRepo(get(data, 'viewer.starredRepositories.nodes', []))
    }, [data])
    
    if (loading) return <React.Fragment>Loading..</React.Fragment>
    if (error) return <React.Fragment>Error Occurred</React.Fragment>
    console.log("TCL: data", data)

    return starredRepo.map(sr => <div>{sr.nameWithOwner}</div>)
}

export default ApolloProv;