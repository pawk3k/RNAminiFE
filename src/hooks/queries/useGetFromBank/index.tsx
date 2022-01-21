import axios, { AxiosError, AxiosResponse } from 'axios';
import { MutationFunction, useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import { toast } from 'react-toastify';

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
  // If not RNA
  if (!data.data.includes('RNA')) {
    throw new Error('File is not RNA');
  }
  return data.data as string;
};

const useGetFromBank = (
  options?: UseMutationOptions<string, ApiError, MutationArguments, unknown>,
): UseMutationResult<string, ApiError, MutationArguments, unknown> =>
  useMutation(getFromBank, {
    onError: ({ response: { status = 0 } = {}, message }) => {
      if (message) {
        toast.error('File is not RNA');
      } else {
        toast.error(`${status === 404 ? 'File with this id not found' : 'Error occurred'}`);
      }
    },
    ...options,
  });

export default useGetFromBank;
