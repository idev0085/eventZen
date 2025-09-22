import { useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createConnection,
  ICreateConnectionPayload,
  IUpdateConnectionNotePayload,
  scanConnection,
  updateConnectionNote,
} from '../api/connectionsApi';
import Toast from 'react-native-simple-toast';

export const useScanConnection = (options: { onScanError: () => void }) => {
  const navigation = useNavigation();

  return useMutation({
    mutationFn: (qrData: string) => scanConnection(qrData),
    onSuccess: foundConnectionData => {
      console.log(
        '🚀 ~ useScanConnection ~ foundConnectionData:',
        foundConnectionData,
      );
      navigation.navigate('ConnectionFound', {
        connection: foundConnectionData,
      });
    },
    onError: (error: any) => {
      console.error('🚀 ~ useScanConnection ~ error:', error);
      options.onScanError();
    },
  });
};

export const useCreateConnection = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  return useMutation({
    mutationFn: (payload: ICreateConnectionPayload) =>
      createConnection(payload),

    onSuccess: () => {
      Toast.show('Connection added successfully!', Toast.LONG);
      queryClient.invalidateQueries({ queryKey: ['connections'] });
      navigation.navigate('ConnectionScreen');
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || 'Failed to add connection!';
      Toast.show(message, Toast.LONG);
    },
  });
};

export const useUpdateConnectionNote = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  return useMutation({
    mutationFn: (payload: IUpdateConnectionNotePayload) =>
      updateConnectionNote(payload),
    onSuccess: () => {
      Toast.show('Note updated successfully!', Toast.LONG);
      queryClient.invalidateQueries({ queryKey: ['connections'] });
      navigation.navigate('ConnectionScreen');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update note!';
      Toast.show(message, Toast.LONG);
    },
  });
};
