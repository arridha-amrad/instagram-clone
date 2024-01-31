import { IComment } from '@/lib/mongoose/models/Comment/types';
import { IPost } from '@/lib/mongoose/models/Post/types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type State = {
  posts: IPost[];
  post: IPost | null;
  isLoading: boolean;
};

type Action = {
  likeComment: (commentId: string) => void;
  setPosts: (data: IPost[]) => void;
  setPost: (data: IPost) => void;
  likePost: (postId?: string) => void;
  setLoading: (val: boolean) => void;
  addComment: (val: IComment, postId?: string) => void;
  addPost: (val: IPost) => void;
};

const usePostsStore = create<State & Action>()(
  immer((set) => ({
    posts: [],
    post: null,
    isLoading: true,
    likeComment(commentId) {
      set((state) => {
        if (!state.post) return;
        const comment = state.post.comments.find((c) => c.id === commentId);
        if (!comment) return;
        if (comment.isLiked) {
          comment.totalLikes -= 1;
        } else {
          comment.totalLikes += 1;
        }
        comment.isLiked = !comment.isLiked;
      });
    },
    setPost(data) {
      set((state) => {
        state.post = data as IPost;
      });
    },
    setLoading(val) {
      set((state) => {
        state.isLoading = val;
      });
    },
    addPost(data) {
      set((state) => {
        state.posts.unshift(data as IPost);
      });
    },
    setPosts(data) {
      set((state) => {
        state.posts = data as IPost[];
      });
    },
    addComment(data: IComment, postId?: string) {
      set((state) => {
        if (postId) {
          const post = state.posts.find((p) => p.id === postId);
          if (post) {
            post.totalComments += 1;
            post.comments.unshift(data as IComment);
          }
        } else {
          if (!state.post) return;
          state.post.totalComments += 1;
          state.post.comments.unshift(data as IComment);
        }
      });
    },
    likePost(postId?: string) {
      set((state) => {
        if (postId) {
          const post = state.posts.find((post) => post.id === postId);
          if (!post) return;
          if (post.isLiked) {
            post.totalLikes -= 1;
          } else {
            post.totalLikes += 1;
          }
          post.isLiked = !post.isLiked;
        } else {
          if (!state.post) return;
          if (state.post.isLiked) {
            state.post.totalLikes -= 1;
          } else {
            state.post.totalLikes += 1;
          }
          state.post.isLiked = !state.post.isLiked;
        }
      });
    }
  }))
);

export default usePostsStore;
