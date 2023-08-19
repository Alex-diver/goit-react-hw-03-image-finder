import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38105470-652721ced6ff5551f65b62ae6';
const perPage = 12;

// export const AllImages = async searchName => {
//   const response = await axios(
//     // `https://pixabay.com/api/?q=${searchName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
//     `https://pixabay.com/api//?q=${searchName}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
//   );
//   return response.data;
// };
export async function AllImages(searchName, page, signal) {
  const response = await axios.get(BASE_URL, {
    signal,
    params: {
      key: API_KEY,
      q: searchName,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: perPage,
      page: page,
    },
  });

  return response.data;
}
