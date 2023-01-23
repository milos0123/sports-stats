import fetch from "isomorphic-fetch";

const baseURL = 'https://soccer.sportmonks.com/api/v2.0';
const apiToken = process.env.SPORTMONKS_API_KEY

export const fetchClubs = async (id = '19686') => {
  try {
    const fetchedData = await fetch(`${baseURL}/teams/season/${id}?api_token=${apiToken}&include=coach,stats,latest,squad.player.country,country.leagues.season&seasons=${id}&tz=Europe/Belgrade`);
    if (!fetchedData.ok) {
      return null
    } else {
      const transformedData = await fetchedData.json()
      return transformedData.data
    }
  }
  catch (e) {
    console.warn(e);
    return null;
  }
}

export const fetchCountries = async (pageNum = 1) => {
  try {
    const fetchedData = await fetch(`${baseURL}/countries?api_token=${apiToken}&include=leagues&page=${pageNum}`);
    if (!fetchedData.ok) {
      return null
    } else {
      const transformedData = await fetchedData.json()
      return transformedData.data
    }
  }
  catch (e) {
    console.warn(e);
    return null;
  }
}

export const fetchStanings = async (seasonId = '19686') => {
  try {
    const fetchedData = await fetch(`${baseURL}/standings/season/${seasonId}?api_token=${apiToken}&include=team,league,season,round,stages&tz=Europe/Belgrade`);
    if (!fetchedData.ok) {
      return null
    } else {
      const transformedData = await fetchedData.json()
      return transformedData.data
    }
  }
  catch (e) {
    console.warn(e);
    return null;
  }
}