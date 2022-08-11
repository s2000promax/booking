import httpService from './http.service';
import localStorageService from './localStorage.service';

const scheduleEndpoint = 'schedule/';

const scheduleService = {
    getSchedualList: async () => {
        const req = await httpService.get(scheduleEndpoint);
        return req.data;
    },
    createSchedual: async (payload) => {
        const { data } = await httpService.post(scheduleEndpoint, payload);
        return data;
    },
    removeSchedual: async (commentId) => {
        const { data } = await httpService.delete(scheduleEndpoint + commentId);
        return data;
    },
    updateSchedual: async (payload) => {
        const { data } = await httpService.patch(
          scheduleEndpoint + localStorageService.getUserId(),
          payload
        );
        return data;
    }
};

export default scheduleService;
