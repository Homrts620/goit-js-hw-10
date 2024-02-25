import axios from 'axios';

export const fetchBreeds = () => {
axios.defaults.headers.common['x-api-key'] =
    'live_vwW8oNfBaqOPjIqE0ap1tBOa1IU3JSSGfWnv7rTeDZu8WNvmsMl7ukGjRazeKIWZ';
return axios.get(`https://api.thecatapi.com/v1/breeds`).then(res => res.data);
};

export const fetchCatByBreed = breedId => {
return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(res => res.data);
};