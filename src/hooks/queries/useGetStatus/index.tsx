import { QueryFunction, QueryObserverResult, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

type StatusResponse = {
  status: string;
  // start file
  data: string;
  solution: string;
  supercomposition: string;
  logs: string;
  filteredpdb: string;
};

const getStatus: QueryFunction<StatusResponse> = async ({ queryKey: [, id] }) => {
  const response = await fetch(`/api/task/${id}`).then((res) => res.json());
  return response;
};

const useGetStatus = (): QueryObserverResult<StatusResponse, Error> => {
  const { query, isReady } = useRouter();
  const [refetchInterval, setRefetchInterval] = useState<5000 | false>(5000);
  return useQuery(['task', query.uid], getStatus, {
    onSuccess: (data) => {
      if (data.status !== 'queued') {
        setRefetchInterval(false);
      }
    },
    enabled: Boolean(query.uid) && isReady,
    refetchInterval,
  });
};

export default useGetStatus;
