const baseURL = 'https://moonsite-rn-follow-test.herokuapp.com/api';

export const loginURL = baseURL + '/usr/login';

export const registerURL = baseURL + '/usr/register';

export const addPost = baseURL + '/post/add-post';

export const getAllPosts = baseURL + '/post/get-all-posts';

export const deletePost = baseURL + '/post/delete-post-by-id/';

export const getFollowersByUserId =
  baseURL + '/follower/get-followers-by-user-id';

export const getMyFollowers = baseURL + '/follower/get-my-followers';

export const addFollower = baseURL + '/follower/add-follower';
