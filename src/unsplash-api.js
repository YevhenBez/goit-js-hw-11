import axios from 'axios';

export class UnsplashAPI {

    page = 1;
    q = null;
    resetPage() {
        this.page = 1;
    }
    async fetchPhotos() {
    try {
        return await axios.get(`https://pixabay.com/api/?key=34783600-4c4882faf47dfa22b7423406f&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`, {
            params: {
            q: this.q,
            page: this.page,
        },
        });
    } catch (err) {
        throw new Error(err.message);
    }
    }
}

    