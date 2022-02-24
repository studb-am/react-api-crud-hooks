"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSelect = exports.useLazySelect = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

var _fetchFn = _interopRequireDefault(require("./fetchFn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const useSelect = variables => {
  const [loading, setLoading] = (0, _react.useState)(false);
  const [error, setError] = (0, _react.useState)(null);
  const [data, setData] = (0, _react.useState)(null);
  const defaultVars = {
    method: 'GET',
    headers: {},
    body: null
  };

  const clearError = () => {
    setError(null);
  };

  const httpAbortCtrl = new AbortController();
  const select = (0, _react.useCallback)(() => (0, _fetchFn.default)(_objectSpread(_objectSpread({}, defaultVars), {}, {
    httpAbortCtrl,
    setLoading,
    setError
  }, variables)), []);
  (0, _react.useEffect)(() => {
    select().then(currData => setData(currData));
  }, [select]);
  (0, _react.useEffect)(() => {
    return () => {
      httpAbortCtrl.abort();
    };
  }, []);
  return {
    data,
    loading,
    error,
    clearError
  };
};

exports.useSelect = useSelect;

const useLazySelect = variables => {
  const [loading, setLoading] = (0, _react.useState)(false);
  const [error, setError] = (0, _react.useState)(null);
  const [data, setData] = (0, _react.useState)(null);
  const defaultVars = {
    method: 'GET',
    headers: {},
    body: null
  };

  const clearError = () => {
    setError(null);
  };

  const httpAbortCtrl = new AbortController();
  const runQuery = (0, _react.useCallback)(() => (0, _fetchFn.default)(_objectSpread(_objectSpread({}, defaultVars), {}, {
    httpAbortCtrl,
    setLoading,
    setError
  }, variables)).then(currData => setData(currData)), []);
  (0, _react.useEffect)(() => {
    return () => {
      httpAbortCtrl.abort();
    };
  }, []);
  return [runQuery, {
    data,
    loading,
    error,
    clearError
  }];
};

exports.useLazySelect = useLazySelect;