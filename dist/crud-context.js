"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

const CrudContext = /*#__PURE__*/(0, _react.createContext)({
  userId: null,
  token: null,
  login: () => {},
  logout: () => {}
});
var _default = CrudContext;
exports.default = _default;