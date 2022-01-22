import { QueryFunction, QueryObserverResult, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';

type StatusResponse = {
  status: string;
  // start file
  data: string;
  solution: string;
  supercomposition: string;
  logs: string;
  filteredpdb: string;
  molprobity: string;
};

const getStatus: QueryFunction<StatusResponse> = async ({ queryKey: [, id] }) => {
  const response = await axios.get(`/api/task/${id}`);
  console.log(atob(response.data?.molprobity));
  return response.data;
};

const useGetStatus = (): QueryObserverResult<StatusResponse, AxiosError> => {
  const { query, isReady, push } = useRouter();
  const [refetchInterval, setRefetchInterval] = useState<5000 | false>(5000);
  return useQuery(['task', query.uid], getStatus, {
    onSuccess: (data) => {
      if (data.status === 'error' || data.status === 'finished') {
        setRefetchInterval(false);
      }
    },
    onError: (error) => {
      // @ts-ignore
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        push('/404');
      }
    },
    retry: false,
    enabled: Boolean(query.uid) && isReady,
    refetchInterval,
  });
};

export default useGetStatus;
