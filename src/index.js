import { fetchBreeds, fetchCatBreeds} from './cat-api';
import './styles.css';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';


const breedSelect = document.querySelector('.breed-select');
const infoCat = document.querySelector('.cat-info');
const loaderPage = document.querySelector('.loader');


document.querySelector('.loader').classList.remove('loading');

async function fetchData() {
try {
    loaderPage.classList.remove('hidden');
    const breedsData = await fetchBreeds();
    renderSelect(breedsData);
    new SlimSelect({
    select: '#single',
    settings: {
        closeOnSelect: true,
        hideSelected: true,
        openPosition: 'auto',
        contentPosition: 'absolute',
    }
    });
} catch (error) {
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
}
}
fetchData();

document.querySelector('.error').style.display = 'none';

function renderSelect(breeds) {
const option = breeds
    .map(({ id, name }) => {
    return `<option value="${id}">${name}</option>`;
    })
    .join('');

breedSelect.insertAdjacentHTML('beforeend', option);
loaderPage.classList.add('hidden');
}

breedSelect.addEventListener('change', async event => {
document.querySelector('.loader').classList.add('loading');
try {
    const catData = await fetchCatBreeds(event.target.value);
    renderCat(catData[0]);
} catch (errorCat) {
    document.querySelector('.loader').classList.remove('loading');
    Notiflix.Notify.failure('Sorry, something went wrong. Please choose another cat breed.');
    infoCat.innerHTML = '';
}
})

document.querySelector('.errorCat').style.display = 'none';


function renderCat(catData) {
const { url } = catData;
const { description, name, temperament, origin } = catData.breeds[0];
infoCat.innerHTML = '';
infoCat.innerHTML += `
    <img src="${url}" alt="${name}" height="960" weight="480"/>
    <h2>${name}</h2>
    <p>${description}</p>
    <p><strong>Temperament:</strong> ${temperament}</p>
    <p>${origin}</p>`;

document.querySelector('.loader').classList.remove('loading');
}