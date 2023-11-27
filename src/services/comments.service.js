import { instance } from '../axios';

export const getComments = async (id) => {
  const { data } = await instance.get(`/comments?id=${id}`);
  return { comments: data };
};

export const createComment = async (data) => {
  await instance.post('/comment', data);
};
