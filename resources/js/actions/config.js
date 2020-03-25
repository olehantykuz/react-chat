import Echo from 'laravel-echo';
import { configService } from '../services/config';
import { authHeader } from '../helpers';

export const setConfig = data => ({
    type: 'SET_CONFIG',
    data,
});
const clearConfig = () => ({
    type: 'CLEAR_CONFIG',
});

export const fetchConfig = () => {
    return dispatch => {
        configService.fetchConfigs().then(response => {
            const { config } = response.data;
            if (config.broadcastDriver === 'redis') {
                window.Echo = new Echo({
                    broadcaster: 'socket.io',
                    host: window.location.hostname + ":" + process.env.MIX_LARAVEL_ECHO_PORT,
                    auth: {
                        headers: authHeader(),
                    },
                })
            }
            dispatch(setConfig(response.data.config));
        },error => {
            dispatch(clearConfig());
        })
    }
};

