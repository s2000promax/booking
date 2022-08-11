import httpService from './http.service';

const citiesGeEndpoint = 'citiesge/';

const citiesGEService = {
    get: async () => {
        const req = await httpService.get(citiesGeEndpoint);
        return req.data;
    }
};
export default citiesGEService;
