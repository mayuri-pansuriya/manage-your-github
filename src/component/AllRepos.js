import React, { useEffect, useState } from "react";
import client from "../apollo";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  GET_STARRED_REPOSITORIES,
  GET_SEARCHED_REPOSITORIES,
  UNSTAR_REPO,
  ADD_STAR
} from "../queries";
import { ApolloProvider } from "react-apollo";
import {
  ApolloProvider as ApolloHooksProvider,
  useQuery,
  useMutation
} from "react-apollo-hooks";
import { get } from "lodash";

const ApolloProv = () => {
  const [starredRepo, setStarredRepo] = useState([]);

  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <AllRepos starredRepo={starredRepo} setStarredRepo={setStarredRepo} />
        <SearchRepos starredRepo={starredRepo} setStarredRepo={setStarredRepo} />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
};

const AllRepos = ({ starredRepo, setStarredRepo }) => {
  const { loading, error, data } = useQuery(GET_STARRED_REPOSITORIES, {
    variables: { number_of_repos: 100 }
  });
  const [unstar] = useMutation(UNSTAR_REPO);

  useEffect(() => {
    setStarredRepo(get(data, "viewer.starredRepositories.nodes", []));
  }, [data]);
  
  if (loading) return <React.Fragment>Loading..</React.Fragment>;
  if (error) return <React.Fragment>Error Occurred</React.Fragment>;
  
  const unstarRepo = sr => {
    unstar({ variables: { id: sr.id } });
    let id = "";
    id = starredRepo.map(srp => {
      if(srp.id === sr.id) {
        id = srp.id;
      }
    })
    let aa = starredRepo;
    aa.splice(id, 1);
    setStarredRepo(aa);
  };

  return (
    <div>
      <div>Starred Repo:</div>
      <ul className="list-group">
        {starredRepo.map(sr => (
          <li className="list-group-item">
            - {sr.nameWithOwner}
            <button
              className="btn btn-primary float-right"
              onClick={e => unstarRepo(sr)}
            >
              unstar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SearchRepos = ({ starredRepo, setStarredRepo }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedRepo, setSearchedRepo] = useState([]);
  const [addStars] = useMutation(ADD_STAR);
  const { data } = useQuery(GET_SEARCHED_REPOSITORIES, {
    variables: {
      searchText: searchText,
      number_of_repos: 100
    }
  });
  useEffect(() => {
    let fetchedData = get(data, "search.edges", []);
    if (fetchedData !== searchedRepo) setSearchedRepo(fetchedData);
  }, [data]);

  const changeSearchText = value => {
    setSearchText(value);
  };

  const starRepo = sr => {
    addStars({ variables: { id: sr.node.id } });
    setStarredRepo([...starredRepo, {...sr.node}])
  };

  return (
    <React.Fragment>
      Search repos to star :
      <input
        value={searchText}
        onInput={e => changeSearchText(e.target.value)}
      />
      <ul className="list-group">
        {searchedRepo.map(sr => (
          <li className="list-group-item">
            - {sr.node.nameWithOwner}
            <button
              className="btn btn-primary float-right"
              onClick={e => starRepo(sr)}
            >
              star
            </button>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};
export default ApolloProv;
