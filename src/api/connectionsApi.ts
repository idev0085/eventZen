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

export interface IConnectionDetails {
  id: string;
  companyName: string;
  company_website: string;
  rep_name: string;
  rep_email: string;
  rep_phone: string;
  avatarUrl: string;
  tags: string[];
  rating: 'Cold' | 'Normal' | 'Warm';
  visitingCardUrl: string;
  note: string;
  rep_address?: string;
  connection_role?: string;
}

export interface IUpdateConnectionPayload {
  id: string | number;
  tags: string[];
  rating: 'Cold' | 'Normal' | 'Warm';
  visitingCardImage: string; // Base64 image string
  note: string;
}

// ! API Function

//! SCan a Qr
export const scanConnection = async (
  qrData: string,
): Promise<IScannedConnection> => {
  console.log(`📡 Scanning with raw QR Data: "${qrData}"`);

  const numericQrData = parseInt(qrData, 10);
  if (isNaN(numericQrData)) {
    throw new Error('Invalid QR code. Scanned data is not a user ID.');
  }

  const { data } = await apiClient.post('/api/connections/scan', {
    qrData: numericQrData,
  });

  if (!data || !data.id) {
    throw new Error(data.message || 'Scan failed!');
  }
  return data;
};

//! Create a connection
export const createConnection = async (payload: ICreateConnectionPayload) => {
  console.log('📡 Creating new connection...');
  const { data } = await apiClient.post('/api/connections/create', payload);

  return data;
};

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

export const getConnectionDetails = async (
  connectionId: string | number,
): Promise<IConnectionDetails> => {
  console.log(`📡 Fetching details for connection ID: ${connectionId}`);
  const { data } = await apiClient.get(`/api/connections/${connectionId}`);
  return data;
};

export const updateConnection = async (payload: IUpdateConnectionPayload) => {
  const { id, ...updateData } = payload;
  console.log(`📡 Updating connection ID: ${id}`);
  const { data } = await apiClient.put(`/api/connections/${id}`, updateData);
  return data;
};
