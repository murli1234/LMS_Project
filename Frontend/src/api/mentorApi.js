import axiosInstance from './axiosConfig';

// Get student queries
export const getQueries = async (page = 0, size = 10) => {
  const response = await axiosInstance.get(`/mentor/queries?page=${page}&size=${size}`);
  return response.data;
};

// Reply to query
export const replyToQuery = async (queryId, replyText) => {
  const response = await axiosInstance.post(`/mentor/queries/${queryId}/reply`, { reply: replyText });
  return response.data;
};

// Mark query as resolved
export const resolveQuery = async (queryId) => {
  const response = await axiosInstance.put(`/mentor/queries/${queryId}/status/resolved`);
  return response.data;
};
