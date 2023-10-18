/**
 * @todo 错误处理, loading, 取消, 进度
 */
import axios from "./axios.ts";
import { Result } from "./types.ts";

class Http {
    get = async <T>(url: string): Promise<T | null> => {
        const { data: axiosResponse } = await axios.get<Result<T>>(url);

        return axiosResponse.data;
    };

    post = async <T>(url: string, body: Object): Promise<T | null> => {
        const { data: axiosResponse } = await axios.post<Result<T>>(url, body);
        if (axiosResponse.code !== 0) {
            throw new Error(axiosResponse.message);
        }

        return axiosResponse.data;
    };
}

const http = new Http();

export default http;
export const { get, post } = http;
