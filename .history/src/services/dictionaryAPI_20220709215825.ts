import axios from 'axios';

export async function searchByQuery(query: string) {
  const { data } = await axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
  );

  return data;
}

export async function searchBysdfsdQuery(query: string) {
  const { data } = await axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
  );

  return data;
}
