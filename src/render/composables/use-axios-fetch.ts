import axios, { AxiosRequestConfig } from 'axios';
import { useAxios } from '@vueuse/integrations/useAxios';
import { UseAxiosOptions } from '@vueuse/integrations';

const instance = axios.create({
  baseURL: 'http://localhost:4000/v1/api'
});

export const useAxiosFetch = <T extends {}>(
  url: string,
  requestConfig: AxiosRequestConfig = {},
  axiosOptions?: UseAxiosOptions
) => {
  const { execute, error, isLoading, isFinished, data } = useAxios<T>(
    url,
    requestConfig,
    instance,
    {
      immediate: false,
      ...axiosOptions
    }
  );

  return { execute, error, isLoading, isFinished, data };
};
