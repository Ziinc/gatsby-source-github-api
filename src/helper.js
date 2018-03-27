// const fetcher = require("graphql-fetch");

// const GITHUB_URL = "https://gitlab.example.com/api/v4/projects/1/wikis?with_content=1";
// const DEFAULT_QUERY = `
// query ($nFirst: Int = 2, $q: String = "") {
//   search(query: $q, type: ISSUE, first: $nFirst){
//     edges{
//       node{
//         ... on PullRequest{
//           title
//         }
//       }
//     }
//   }
// }
// `;
// const DEFAULT_VARIABLES = { q: "", nFirst: 1 };
const fetchFromAPI = (
  id,
  token,
) => {
  const url =  `https://gitlab.example.com/api/v4/projects/${id}/wikis?with_content=1`
  const headers = new Headers();
  headers.set("PRIVATE-TOKEN", token);

  return await fetch(url,{
    headers,  
    method: "GET",
    mode: "cors"
  })
};

// async function fetchJSON(fetch, token, query, variables) {
//   const headers = new Headers();
//   headers.set("PRIVATE-TOKEN", token);
//   return await fetch(query, variables, {
//     headers,  
//     method: "GET",
//     mode: "cors"
//   });
// }

exports.fetchFromGitlabWiki = fetchFromAPI;
