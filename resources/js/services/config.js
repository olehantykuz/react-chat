import axios from 'axios';

const fetchConfigs = () => {
    return axios({
        url: `/api/config`,
        method: 'get',
    }).then(response => {
        if (response.status < 400) {
            localStorage.setItem('broadcastChannelPrefix', JSON.stringify(response.data.config.broadcastChannelPrefix));
            localStorage.setItem('broadcastDriver', JSON.stringify(response.data.config.broadcastDriver));
        }

        return response
    });
};

export const configService = {
    fetchConfigs
};
