import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createConnection,
  getConnectionDetails,
  ICreateConnectionPayload,
  IUpdateConnectionNotePayload,
  IUpdateConnectionPayload,
  scanConnection,
  updateConnection,
  updateConnectionNote,
} from '../api/connectionsApi';
import Toast from 'react-native-simple-toast';

export const useScanConnection = (options: { onScanError: () => void }) => {
  const navigation = useNavigation();

  return useMutation({
    mutationFn: (qrData: string) => scanConnection(qrData),
    onSuccess: foundConnectionData => {
      navigation.navigate('ConnectionFound', {
        connection: foundConnectionData,
      });
    },
    onError: (error: any) => {
      if (error.response && error.response.status === 404) {
        Toast.show('User not found for this QR code.', Toast.LONG);
      } else {
        Toast.show(
          'An error occurred during scan. Please try again.',
          Toast.LONG,
        );
      }
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
      navigation.navigate('BottomTabNavigator', {initialRouteName: 'Connection'});
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update note!';
      Toast.show(message, Toast.LONG);
    },
  });
};

export const useConnectionDetails = (connectionId: string | number) => {
  return useQuery({
    queryKey: ['connection', connectionId],
    queryFn: () => getConnectionDetails(connectionId),
    enabled: !!connectionId,
  });
};

export const useUpdateConnection = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  return useMutation({
    mutationFn: (payload: IUpdateConnectionPayload) =>
      updateConnection(payload),
    onSuccess: (updatedData, variables) => {
      Toast.show('Connection updated successfully!', Toast.LONG);

      queryClient.invalidateQueries({ queryKey: ['connections'] });

      queryClient.invalidateQueries({ queryKey: ['connection', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['connection'] });

      navigation.goBack();
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || 'Failed to update connection!';
      Toast.show(message, Toast.LONG);
    },
  });
};
