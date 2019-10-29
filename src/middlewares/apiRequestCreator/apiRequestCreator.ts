import axios from 'axios';
import { API_METHODS } from 'constants/common';

const apiRequestCreator =
    (store: any) =>
        (next: any) =>
            (action: any) => {
                if (action.isRequest) {
                    const { GET } = API_METHODS;
                    const { method, url, data, headers } = action.payload;
                    const methods = {
                        [GET]: ({ url, data, headers }: any) => {
                            const options = {
                                headers,
                                data,
                                url,
                                method: 'GET',
                            } as any;
                            return axios(options);
                        },
                    };
                    const request = new Promise((resolve, reject) => {
                        methods[method]({ url, data, headers })
                            .then((response: any) => {
                                resolve(response);
                            })
                            .catch((error: any) => {
                                reject(error);
                            });
                    });

                    return new Promise((resolve) => {
                        resolve(
                            next({
                                ...action,
                                payload: request,
                            }),
                        );
                    });
                }
                return new Promise((resolve) => {
                    resolve(next(action));
                });
            };

export default apiRequestCreator;
