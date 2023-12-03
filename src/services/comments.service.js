import { instance } from '../axios';

export const createComment = async (data) => {
  await instance.post('/comment', data);
};

export const deleteComment = async (id) => {
  await instance.delete(`/comment?id=${id}`);
};

export const editComment = async (content, id) => {
  await instance.put(`/comment?id=${id}`, content);
};

export const getComments = async (id) => {
  const { data } = await instance.get(`/comments?id=${id}`);
  return { comments: data };
};
