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
        post.isLiked = !post.isLiked;
      });
    }
  }))
);

export default usePostsStore;
