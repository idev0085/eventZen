import { apiClient } from './apiClient';

export interface IToggleFavoritePayload {
  sessionId: string | number;
  isFav: boolean;
}

export interface IUpdateAgendaPayload {
  sessionId: string | number;
  message: string;
}

export const toggleFavorite = async (payload: IToggleFavoritePayload) => {
  const { sessionId, isFav } = payload;
  const { data } = await apiClient.get(`/api/sessions/${sessionId}/favourite`, {
    params: { isFav },
  });
  return data;
};

export const updateAgenda = async (payload: IUpdateAgendaPayload) => {
  const { sessionId, message } = payload;
  const { data } = await apiClient.post(`/api/sessions/${sessionId}/agenda`, {
    message,
    isInAgenda: true,
  });

  return data;
};

export const getMyAgenda = async () => {
  const { data } = await apiClient.get('/api/agenda');
  return data;
};
