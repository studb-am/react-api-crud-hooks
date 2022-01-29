"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.json.stringify.js");

var _react = _interopRequireWildcard(require("react"));

var _crudContext = _interopRequireDefault(require("./crud-context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const CrudProvider = props => {
  const {
    enablesToken,
    tokenExpiresIn
  } = props;

  if (typeof tokenExpiresIn !== 'number') {
    throw new Error('Please insert a value for tokenExpiresIn numeric in milliseconds!');
  }

  const [userId, setUserId] = (0, _react.useState)(null);
  const [token, setToken] = (0, _react.useState)(null);
  const [tokenExpDate, setTokenExpDate] = (0, _react.useState)(null);
  const login = (0, _react.useCallback)(loginObj => {
    const {
      uid,
      newToken,
      expDate,
      keepDataOnStorage
    } = loginObj;
    const keepData = keepDataOnStorage !== undefined ? keepDataOnStorage : true;
    const currToken = enablesToken && newToken !== undefined ? newToken : null;
    setUserId(uid);
    setToken(newToken);
    let newExpDate;

    if (newToken) {
      newExpDate = expDate || new Date(new Date().getTime() + tokenExpiresIn * 60 * 60).toISOString();
      setTokenExpDate(newExpDate);
    }

    if (keepData) {
      localStorage.setItem('userData', JSON.stringify({
        userId: uid,
        token: currToken,
        expirationDate: newExpDate
      }));
    }

    console.log('logged In!');
  }, []);
  const logout = (0, _react.useCallback)(() => {
    localStorage.removeItem('userData');
    setToken(null);
    setTokenExpDate(null);
    setUserId(null);
    console.log('logged Out');
  }, []); //Auto-login, in case the user logged and saved his login data
  ////if there is a valid token, then I log the user automatically

  (0, _react.useEffect)(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (storedUserData !== null && storedUserData !== void 0 && storedUserData.token && new Date(storedUserData.expirationDate) > new Date()) {
      login({
        uid: storedUserData.userId,
        newToken: storedUserData.token,
        expDate: storedUserData.expirationDate
      });
    }
  }, []); ////if there is the token expiration date to be set

  (0, _react.useEffect)(() => {
    let timeoutLogger;

    if (tokenExpDate && token) {
      const remainingTime = new Date(tokenExpDate).getTime() - new Date().getTime();
      timeoutLogger = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(timeoutLogger);
    }
  }, [token, tokenExpDate]);
  return /*#__PURE__*/_react.default.createElement(_crudContext.default.Provider, {
    value: {
      userId,
      userIsLogged: !!token,
      token,
      login,
      logout
    }
  }, props.children);
};

var _default = CrudProvider;
exports.default = _default;