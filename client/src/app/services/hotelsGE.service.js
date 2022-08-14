import httpService from './http.service';

const hotelsGeEndpoint = 'hotelsge/';

const hotelsGEService = {
    get: async () => {
        const req = await httpService.get(hotelsGeEndpoint);
        return req.data;
    },
    post: async (payload) => {
        const { data } = await httpService.post(hotelsGeEndpoint, payload);
        return data;
    },
};
export default hotelsGEService;
