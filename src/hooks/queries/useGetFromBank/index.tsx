import { QueryFunction, QueryObserverResult, useQuery } from 'react-query';

const getFromBank: QueryFunction = async () => {
  //   const { data } = await api.customersService.getCustomer(id);
  const data = await fetch('https://files.rcsb.org/download/200D.cif.gz');
  return data;
};

const useGetFromBank = (): QueryObserverResult => useQuery([], getFromBank);

export default useGetFromBank;
