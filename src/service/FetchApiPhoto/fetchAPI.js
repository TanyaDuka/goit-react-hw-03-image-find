const KEY = '26886697-f132e609f22bab827cfdbeee1';

export default function fetchAPI(search, page, PER_PAGE) {
  return fetch(
    `https://pixabay.com/api/?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Not Found ${search}`));
  });
}
