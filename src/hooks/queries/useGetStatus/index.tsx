import { QueryFunction, QueryObserverResult, useQuery } from 'react-query';
import { useRouter } from 'next/router';

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
  const { query } = useRouter();
  return useQuery(['task', query.uid], getStatus, {
    enabled: Boolean(query.uid),
  });
};

export default useGetStatus;
