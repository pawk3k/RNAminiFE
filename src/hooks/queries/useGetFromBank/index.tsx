import { useEmailContext } from '@root/contextProviders/EmailContext';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { MutationFunction, useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import { toast } from 'react-toastify';
import useAddFile from '../useAddFile';

type MutationArguments = {
  proteinChars: string;
  options?: UseMutationOptions<string, unknown, void, unknown>;
};

type ApiError = AxiosError<{
  code: string | null;
  message: string;
  response: AxiosResponse;
  statusCode: number;
}>;

const getFromBank: MutationFunction<string, MutationArguments> = async ({ proteinChars }) => {
  const data = await axios.get(`https://files.rcsb.org/download/${proteinChars}.pdb`);
  return data.data;
};

const useGetFromBank = (
  options?: UseMutationOptions<string, ApiError, MutationArguments, unknown>,
): UseMutationResult<string, ApiError, MutationArguments, unknown> => {
  const { mutate: sendToServer } = useAddFile();
  const [email] = useEmailContext();
  return useMutation(getFromBank, {
    onSuccess: (data) => {
      sendToServer({ file: data, email });
    },
    onError: ({ response: { status = 0 } = {} }) => {
      toast(`${status === 404 ? 'File with this id not found' : 'Error occurred'}`);
    },
    ...options,
  });
};

export default useGetFromBank;
