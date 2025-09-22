import { apiClient } from './apiClient';

export interface IScannedConnection {
  id: number;
  name: string;
  company: string;
  designation: string;
  company_website: string;
  email: string;
  phone: string;
  avatar: string;
  visiting_card_image: string;
  tags: string; // Comma-separated string
  rating: 'Cold' | 'Normal' | 'Warm';
  address: string | null;
  bio: string;
  note: string;
}

export interface ICreateConnectionPayload {
  title: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company_name: string;
  job_title: string;
  address: string;
  visiting_card_image: string; // base64 string
  rating: 'Cold' | 'Normal' | 'Warm';
  tag: string[]; // Array of strings
  note: string;
}

export interface IUpdateConnectionNotePayload {
  note: string;
  connectionId: number;
}

// ! API Function

//! SCan a Qr
export const scanConnection = async (
  qrData: string,
): Promise<IScannedConnection> => {
  console.log(`📡 Scanning with QR Data: ${qrData}`);
  const { data } = await apiClient.post('/api/connection/scan', { qrData });

  if (!data || !data.id) {
    throw new Error(data.message || 'Scan Failed!');
  }
  return data;
};

//! Create a connection
export const createConnection = async (payload: ICreateConnectionPayload) => {
  console.log('📡 Creating new connection...');
  const { data } = await apiClient.post('/api/connections/create', payload);

  return data;
};

//! get a connection details
export const getConnectionById = async id => {};

//! update note
export const updateConnectionNote = async (
  payload: IUpdateConnectionNotePayload,
) => {
  console.log(`📡 Updating note for connection ID: ${payload.connectionId}`);
  const apiPayload = {
    note: payload.note,
    qrData: payload.connectionId,
  };
  const { data } = await apiClient.put(
    '/api/connections/update/scan',
    apiPayload,
  );
  return data;
};
