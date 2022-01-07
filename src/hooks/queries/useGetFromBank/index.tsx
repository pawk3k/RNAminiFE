import { MutationFunction, useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import { toast } from 'react-toastify';
import useAddFile from '../useAddFile';

type MutationArguments = {
  proteinChars: string;
  options?: UseMutationOptions<string, unknown, void, unknown>;
};

const getFromBank: MutationFunction<string, MutationArguments> = async ({ proteinChars }) => {
  const data = await fetch(`https://files.rcsb.org/download/${proteinChars}.cif.gz`);
  if (!data.ok) {
    throw new Error('Network response was not ok');
  }
  const resp = await data.text();

  return resp;
};

const useGetFromBank = (
  options?: UseMutationOptions<string, unknown, MutationArguments, unknown>,
): UseMutationResult<string, unknown, MutationArguments, unknown> => {
  const { mutate: sendToServer } = useAddFile();
  return useMutation(getFromBank, {
    onSuccess: (data) => {
      sendToServer({ proteinChars: data });
      toast('Success!');
    },
    onError: () => {
      toast('Error!');
    },
    ...options,
  });
};

export default useGetFromBank;
