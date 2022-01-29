"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fetchFn = async state => {
  const {
    setLoading,
    setError,
    url,
    method,
    headers,
    body,
    httpAbortCtrl
  } = state;

  try {
    setLoading(true);
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: body,
      signal: httpAbortCtrl.signal
    });
    const data = await response.json();

    if (!response.ok) {
      const newErr = new Error(data.message || 'An unexpected error occured. Please try again later!');
      setError(newErr);
      throw newErr;
    }

    return data;
  } catch (err) {
    setError(err);
    throw err;
  } finally {
    setLoading(false);
  }
};

var _default = fetchFn;
exports.default = _default;