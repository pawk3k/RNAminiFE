import { QueryFunction, QueryObserverResult, useQuery } from 'react-query';
import { useRouter } from 'next/router';

type StatusResponse = {
  status: string;
  // start file
  data: string;
  solution: string;
  superComposition: string;
  logs: string;
  filteredPdb: string;
};

const getStatus: QueryFunction<StatusResponse> = async ({ queryKey: [, id] }) => {
  const response = await fetch(`/api/task/${id}`).then((res) => res.json());

  return response;
};

const useGetStatus = (): QueryObserverResult<StatusResponse, Error> => {
  const { query } = useRouter();
  return useQuery(['task', query.uid], getStatus, {
    keepPreviousData: true,
  });
};

export default useGetStatus;
