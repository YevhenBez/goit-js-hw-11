import axios from 'axios';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { UnsplashAPI } from './unsplash-api';

const searchForm = document.querySelector("#search-form");

const btnSearch = searchForm.lastElementChild;

const inputSearch = searchForm.firstElementChild;

const gallery = document.querySelector(".gallery");

const btnLoadMore = document.querySelector(".load-more");

const unsplashApi = new UnsplashAPI();

btnLoadMore.classList.add('is-hidden');

// const fetchPhotos = name => axios.get(`https://pixabay.com/api/?key=34783600-4c4882faf47dfa22b7423406f&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`);

const handleFormSubmit = async (event) => {
    event.preventDefault();

    const seekedPhoto = inputSearch.value;
    unsplashApi.q = seekedPhoto;
    unsplashApi.resetPage();

    try {

    
    
        const responsePhotos = await unsplashApi.fetchPhotos();

        console.log(responsePhotos.data);

        gallery.innerHTML = ''
                
        if (responsePhotos.data.hits.length === 0) {
            emptyArray();
            btnLoadMore.classList.add('is-hidden');

            return
        }

        gallery.insertAdjacentHTML('beforeend', renderPhotos(responsePhotos))

        btnLoadMore.classList.remove('is-hidden');
    
    } catch(error) { console.log(error); }
}

searchForm.addEventListener('submit', handleFormSubmit);

const handleLoadMoreBtnClick = async (event) => {
    unsplashApi.page += 1;

    try {
    const responsePhotos = await unsplashApi.fetchPhotos();
    
        const totalPages = Math.round(responsePhotos.data.totalHits / 40);

        console.log(unsplashApi.page);
    
        console.log(totalPages);
        
    if (unsplashApi.page === totalPages) {
        btnLoadMore.classList.add('is-hidden');
    }

    gallery.insertAdjacentHTML(
        'beforeend',
        renderPhotos(responsePhotos)
    );
    } catch (err) {
    console.log(err);
    }
};

function renderPhotos({ data }) {
    
    const markup = data.hits
.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
        <div class="photo-card">
            <img class="photo-image" src="${webformatURL.replace('_640', '_180')}" alt="${tags}" loading="lazy" />
            <div class="info"
                <p class="info-item">
                    
                </p>
                <p class="info-item">
                    <b>Likes</b><br>${likes}
                </p>
                <p class="info-item">
                    <b>Views</b><br>${views}
                </p>
                <p class="info-item">
                    <b>Comments</b><br>${comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b><br>${downloads}
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



btnLoadMore.addEventListener('click', handleLoadMoreBtnClick);