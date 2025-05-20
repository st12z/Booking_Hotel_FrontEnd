"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SaveUser = void 0;

var SaveUser = function SaveUser() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SAVE_USER':
      return action.data;

    default:
      return state;
    // đảm bảo luôn trả về state cũ nếu không phải action SAVE_USER
  }
};

exports.SaveUser = SaveUser;