import axios from 'axios';

export async function getDefaultRecipe(query) {
    const { data } = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
    );

    return data;
}