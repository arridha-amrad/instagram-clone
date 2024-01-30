import { baseURL } from '@/actions/variables';

const getAvatar = (avatar?: string | null) => {
  return avatar ?? `${baseURL}/default_profile.jpg`;
};

export default getAvatar;
