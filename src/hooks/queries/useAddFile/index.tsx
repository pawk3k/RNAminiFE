import { useRouter } from 'next/router';
//  redirect to url get from react query from endpoint

import { MutationFunction, useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import { toast } from 'react-toastify';

type MutationArguments = {
  file: string;
  email?: string;
  options?: UseMutationOptions<string, unknown, void, unknown>;
};

const getUID: MutationFunction<string, MutationArguments> = async ({
  file: proteinChars,
  email = '',
}) => {
  const response = await fetch('http://localhost:8080/api/task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: proteinChars,
      email,
    }),
  }).then((res) => res.json());
  return response.uuid;
};

const useAddFile = (
  options?: UseMutationOptions<string, unknown, MutationArguments, unknown>,
): UseMutationResult<string, unknown, MutationArguments, unknown> => {
  const { push } = useRouter();
  return useMutation(getUID, {
    onSuccess: (uid) => {
      push(`/output/${uid}`);
    },
    onError: () => {
      toast('Error!');
    },
    ...options,
  });
};

export default useAddFile;
