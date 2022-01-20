import { useRouter } from 'next/router';
//  redirect to url get from react query from endpoint

import { MutationFunction, useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import { toast } from 'react-toastify';

type MutationArguments = {
  file: string;
  email: string | null;
  options?: UseMutationOptions<string, unknown, void, unknown>;
};

const getUID: MutationFunction<string, MutationArguments> = async ({ file = '', email }) => {
  const response = await fetch(`/api/task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: file,
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
    onSuccess: (uid: string) => {
      push(`/output/${uid}`);
    },
    onError: () => {
      toast('Error!');
    },
    ...options,
  });
};

export default useAddFile;
