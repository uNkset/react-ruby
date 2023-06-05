import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import produce from 'immer';
import { RootState } from '../../app/store';
import { fetchPosts } from './postAPI';

export enum Statuses {
  Initial = 'Not Fetched',
  Loading = 'Loading...',
  UpToDate = 'Up To Date',
  Deleted = 'Deleted',
  Error = 'Error',
}

export interface PostState {
  id?: number;
  title?: string;
  body?: string;
  created_at?: any;
  updated_at?: any;
}

export interface PostsState {
  posts: PostState[];
  status: string;
}

const initialState: PostsState = {
  posts: [
    {
      id: 0,
      title: '',
      body: '',
      created_at: '',
      updated_at: '',
    },
  ],
  status: Statuses.Initial,
};

export const fetchPostsAsync = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await fetchPosts();
    return response;
  }
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {}, // sync actions
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.pending, (state) => {
        return produce(state, (draft) => {
          draft.status = Statuses.Loading;
        });
      })
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        return produce(state, (draft) => {
          draft.posts = action.payload;
          draft.status = Statuses.UpToDate;
        });
      })
      .addCase(fetchPostsAsync.rejected, (state) => {
        return produce(state, (draft) => {
          draft.status = Statuses.Error;
        });
      });
  },
});

// frontend actions like sorting and etc...
//export const {} = postSlice.actions;

export const selectPosts = (state: RootState) => state.posts.posts;

export const selectStatus = (state: RootState) => state.posts.status;

export default postSlice.reducer;
