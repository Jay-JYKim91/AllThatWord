import axios from 'axios';

export async function getDefaultRecipe() {
    const { data } = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/random.php`
    );

    return data['meals'][0];
}