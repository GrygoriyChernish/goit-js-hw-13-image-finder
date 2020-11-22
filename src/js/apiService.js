const API_KEY = "key=19220903-64d397b0478b4f9618e32d188";
const BASE_URL = "https://pixabay.com/api"

export default class FindImageApiSevice {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&${API_KEY}`;

    const response = await fetch(url);
    const images = await response.json();

    this.incrementPage();

    return images.hits;
  
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery
   }
  set query(newQuery) {
    this.searchQuery = newQuery
  }
}