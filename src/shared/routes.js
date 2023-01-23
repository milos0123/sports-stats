import { fetchClubs, fetchCountries, fetchStanings } from "../server/api-sportmonks";

const fetchLevel_1 = {
  fetchInitialNationsData: () => fetchCountries(),
  fetchLevel: 1,
}
const fetchLevel_2 = {
  fetchInitialClubsData: (path = "") => fetchClubs(path.split("/")[4]),
  fetchInitialNationsData: (nationsPagination) => fetchCountries(nationsPagination),
  fetchInitialStandings: (path = "") => fetchStanings(path.split("/")[4]),
  fetchLevel: 2,
}
const routes = [
  {
    path: "/user/register",
  },
  {
    path: "/user/login"
  },
  {
    path: "/fudbal",
    ...fetchLevel_1
  },
  {
    path: "/soccer/league",
    ...fetchLevel_1
  },
  {
    path: "/soccer/league/:leagueName",
    ...fetchLevel_1
  },
  {
    path: "/soccer/league/:leagueName/:id",
    ...fetchLevel_2
  },
  {
    path: "/soccer/league/:leagueName/:id/:clubName/:clubID",
    ...fetchLevel_2
  },
  {
    path: "/soccer/league/:leagueName/:id/:clubName/:clubID/:clubNav",
    ...fetchLevel_2
  },
  {
    path: "/soccer/league/:leagueName/:id/:clubName/:clubID/:clubNav/:playerName/:playerID",
    ...fetchLevel_2
  },
];

export default routes;