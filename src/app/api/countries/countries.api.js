const COUNTRIES_URL = 'https://countriesnow.space/api/v0.1/countries/';
let isLoading = false;
const fetchCountries = async () => {
  try {
    isLoading = true;

    const response = await fetch(COUNTRIES_URL, {
      method: 'GET'
    });
    return await response.json();
  } catch (error) {
    console.log('error', error);
  } finally {
    isLoading = false;
  };
  return isLoading;
};

export default {
  fetchCountries
};
