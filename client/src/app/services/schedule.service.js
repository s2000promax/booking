import httpService from './http.service';
import localStorageService from './localStorage.service';

const scheduleEndpoint = 'schedule/';

const scheduleService = {
    getScheduleList: async () => {
        const req = await httpService.get(scheduleEndpoint);
        return req.data;
    },
    createSchedule: async (payload) => {
        const { data } = await httpService.post(scheduleEndpoint, payload);
        return data;
    },
    removeSchedule: async (scheduleId) => {
        const { data } = await httpService.delete(scheduleEndpoint + scheduleId);
        return data;
    },
    updateSchedule: async (payload) => {
        const { data } = await httpService.patch(
          scheduleEndpoint + localStorageService.getUserId(),
          payload
        );
        return data;
    }
};

export default scheduleService;
