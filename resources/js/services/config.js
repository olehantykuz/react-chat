import axios from 'axios';

const fetchConfigs = () => {
    return axios({
        url: `/api/config`,
        method: 'get',
    }).then(response => response);
};

export const configService = {
    fetchConfigs
};
