import axios from 'axios';

export default async function searchByQuery(query: string) {
  const { data } = await axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
  );

  return data[0];
}