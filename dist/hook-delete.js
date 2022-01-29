"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

var _fetchFn = _interopRequireDefault(require("./fetchFn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const useDelete = () => {
  const [loading, setLoading] = (0, _react.useState)(false);
  const [error, setError] = (0, _react.useState)(null);
  const defaultVars = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const clearError = () => {
    setError(null);
  };

  const httpAbortCtrl = new AbortController();
  const deleteFn = (0, _react.useCallback)(variables => (0, _fetchFn.default)(_objectSpread(_objectSpread({}, defaultVars), {}, {
    httpAbortCtrl,
    setLoading,
    setError
  }, variables)), []); //if the component will be unmounted, then I will fire the query to the server

  (0, _react.useEffect)(() => {
    return () => {
      httpAbortCtrl.abort();
    };
  }, []);
  return [deleteFn, {
    loading,
    error,
    clearError
  }];
};

var _default = useDelete;
exports.default = _default;