import { IComment, IPost } from '@/actions/server/post';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type State = {
  posts: IPost[];
  isLoading: boolean;
};

type Action = {
  setPosts: (data: IPost[]) => void;
  likePost: (postId: string) => void;
  setLoading: (val: boolean) => void;
  addComment: (val: IComment) => void;
  addPost: (val: IPost) => void;
};

const usePostsStore = create<State & Action>()(
  immer((set) => ({
    posts: [],
    isLoading: true,
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
    addComment(data: IComment) {
      set((state) => {
        const post = state.posts.find((p) => p.id === data.post.toString());
        if (post) {
          post.totalComments += 1;
          post.comments.unshift(data as IComment);
        }
      });
    },
    likePost(postId) {
      set((state) => {
        const post = state.posts.find((post) => post.id === postId);
        if (!post) return;
        if (post.isLiked) {
          post.totalLikes -= 1;
        } else {
          post.totalLikes += 1;
        }
        post.isLiked = !post.isLiked;
      });
    }
  }))
);

export default usePostsStore;
