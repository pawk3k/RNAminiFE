import { useEmailContext } from '@root/contextProviders/EmailContext';
import { MutationFunction, useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import { toast } from 'react-toastify';
import useAddFile from '../useAddFile';

type MutationArguments = {
  proteinChars: string;
  options?: UseMutationOptions<string, unknown, void, unknown>;
};

const getFromBank: MutationFunction<string, MutationArguments> = async ({ proteinChars }) => {
  const data = await fetch(`https://files.rcsb.org/download/${proteinChars}.pdb`);
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
  const [email] = useEmailContext();
  return useMutation(getFromBank, {
    onSuccess: (data) => {
      sendToServer({ file: data, email });
      toast('Success!');
    },
    onError: () => {
      toast('Error!');
    },
    ...options,
  });
};

export default useGetFromBank;
