import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-simple-toast';
import {
  uploadFile,
  deleteFile,
  IUploadFilePayload,
  IDeleteFilePayload,
} from '../api/filesApi';

interface IFileMutationOptions {
  queryKeyToInvalidate: any[];
}

export const useUploadFile = ({
  queryKeyToInvalidate,
}: IFileMutationOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUploadFilePayload) => uploadFile(payload),
    onSuccess: () => {
      Toast.show('File uploaded successfully!', Toast.LONG);
      queryClient.invalidateQueries({ queryKey: queryKeyToInvalidate });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'File upload failed!';
      Toast.show(message, Toast.LONG);
    },
  });
};

export const useDeleteFile = ({
  queryKeyToInvalidate,
}: IFileMutationOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IDeleteFilePayload) => deleteFile(payload),
    onSuccess: () => {
      Toast.show('File deleted successfully!', Toast.SHORT);
      queryClient.invalidateQueries({ queryKey: queryKeyToInvalidate });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to delete file!';
      Toast.show(message, Toast.SHORT);
    },
  });
};
