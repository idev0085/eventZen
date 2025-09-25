import { apiClient } from './apiClient';

export type FileOwnerType = 'exhibitor' | 'sponsor' | 'connection';

export interface IUploadFilePayload {
  detailsId: string | number;
  type: FileOwnerType;
  file: string | FormData; // base64 string
}

export interface IDeleteFilePayload {
  detailsId: string | number;
  type: FileOwnerType;
  fileId: string;
}

export const uploadFile = async (payload: IUploadFilePayload) => {
  const { detailsId, type, file } = payload;
  console.log(`📡 Uploading file for ${type} ID: ${detailsId}`);

  if (file instanceof FormData) {
    // Multiple files → FormData
    file.append('type', type);
    const { data } = await apiClient.post(`/api/${detailsId}/files`, file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  } else {
    // Single file → JSON
    const { data } = await apiClient.post(`/api/${detailsId}/files`, {
      file,
      type,
    });
    return data;
  }
};

export const deleteFile = async (payload: IDeleteFilePayload) => {
  const { detailsId, type, fileId } = payload;
  console.log(`📡 Deleting file ${fileId} for ${type} ID: ${detailsId}`);
  const { data } = await apiClient.delete(`/api/${detailsId}/files`, {
    data: { fileId, type },
  });
  return data;
};
