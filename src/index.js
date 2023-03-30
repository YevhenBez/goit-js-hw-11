import axios from 'axios';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchForm = document.querySelector("#search-form");

const btnSearch = searchForm.lastElementChild;

const inputSearch = searchForm.firstElementChild;

const gallery = document.querySelector(".gallery");

const btnLoadMore = document.querySelector(".load-more");

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

        console.log(responsePhotos);

        gallery.innerHTML = ''
                
        if (responsePhotos.hits.length === 0) {
        emptyArray()
        }

        gallery.insertAdjacentHTML('beforeend', renderPhotos(responsePhotos))
    
    } catch(error) { console.log(error); }
}

searchForm.addEventListener('submit', handleFormSubmit);

function renderPhotos({ hits }) {
    const markup = hits
.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
        <div class="photo-card">
            <img src="${webformatURL.replace('_640', '_180')}" alt="${tags}" loading="lazy" width='400px'/>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>${likes}
                </p>
                <p class="info-item">
                    <b>Views</b>${views}
                </p>
                <p class="info-item">
                    <b>Comments</b>${comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b>${downloads}
                </p>
            </div>
        </div>
        `
    })
    .join('')
    return markup
}

function emptyArray() {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.')
}