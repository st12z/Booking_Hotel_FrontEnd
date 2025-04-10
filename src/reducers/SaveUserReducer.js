export const SaveUser = (state = {}, action) => {
  switch (action.type) {
    case 'SAVE_USER':
      return action.data;
    default:
      return state; // đảm bảo luôn trả về state cũ nếu không phải action SAVE_USER
  }
};