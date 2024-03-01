import axios from 'axios';

export const fetchBreeds = async () => {
axios.defaults.headers.common['x-api-key'] =
    'live_vwW8oNfBaqOPjIqE0ap1tBOa1IU3JSSGfWnv7rTeDZu8WNvmsMl7ukGjRazeKIWZ';

    const response = await axios.get(`https://api.thecatapi.com/v1/breeds`);
    return response.data;
};

export const fetchCatBreeds = async breedId => {
    const response = await axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    return response.data;
};