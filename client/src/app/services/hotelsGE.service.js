import httpService from './http.service';

const hotelsGeEndpoint = 'hotelsge/';

const hotelsGEService = {
    get: async () => {
        const req = await httpService.get(hotelsGeEndpoint);
        return req.data;
    }
};
export default hotelsGEService;
