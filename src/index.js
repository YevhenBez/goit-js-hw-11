import axios from 'axios';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchForm = document.querySelector("#search-form");

const btnSearch = searchForm.lastElementChild;

const inputSearch = searchForm.firstElementChild;

const fetchPhotos = name => fetch(`https://pixabay.com/api/?key=34783600-4c4882faf47dfa22b7423406f&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    });

const handleFormSubmit = async (event) => {
    try {
        event.preventDefault();

    const seekedPhoto = inputSearch.value;
    
        const responsePhotos = await fetchPhotos(seekedPhoto);
        const photos = await responsePhotos;
        console.log(photos);
    
    } catch(error) { console.log(error); }
}

searchForm.addEventListener('submit', handleFormSubmit);
