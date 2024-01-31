import { Types } from 'mongoose';

export const checkIsExists = (arr: Types.ObjectId[], variable?: string) => {
  return variable ? !!arr.find((id) => id.toString() === variable) : false;
};
