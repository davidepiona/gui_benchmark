import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let _isConnected = false;
export const isConnected = () => _isConnected;

const configureWebSocket = ({ endpoint, credentials, onConnectedCallback,
    onDisconnectedCallback, logOnConsole, timeout }) => {
  if (typeof endpoint !== 'string') {
    throw new Error('Endpoint must be a string');
  }

  if (logOnConsole && (typeof logOnConsole !== 'boolean')) {
    throw new Error('LogOnConsole must be a bool');
  }

  let period = 1000;
  if (timeout) {
    if (typeof timeout !== 'number') {
      throw new Error(
        'Timeout must be an integer number (is expressed in milliseconds)'
      );
    }

    period = timeout;
  }

  if (onConnectedCallback && (typeof onConnectedCallback !== 'function')) {
    throw new Error(
      'onConnectedCallback must be a 1-argument callback function '
      + '(a reference to stomp is returned)'
    );
  }

  if (onDisconnectedCallback && typeof onDisconnectedCallback !== 'function') {
    throw new Error(
      'onDisconnectedCallback must be a callback function with zero arguments'
    );
  }

  const _checkLogEnabled = (logOnConsole) => {
    return (logOnConsole || false);
  };

  const _log = (msg) => {
    if (_checkLogEnabled(logOnConsole)) {
      console.log(`[ws] ${msg}`);
    }
  };

  const _connectionEstablished = (stomp) => {
      _isConnected = true;
      _log('Connection established');
      if (onConnectedCallback) {
        onConnectedCallback(stomp);
      }
  };

  let _connect = () => {};

  const _tryReconnect = () => {
    if (onDisconnectedCallback) {
      onDisconnectedCallback();
    }

    _log(`Connection lost. Next reconnection in ${period}ms...`);
    setTimeout(_connect, period)
  };

  const cCredentials = credentials || {};
  _connect = () => {
    _log(`Trying to connect to "${endpoint}"`);
    let socket = new SockJS(endpoint);
    let stomp = Stomp.over(socket);
    if (!_checkLogEnabled(logOnConsole)) {
      stomp.debug = null;
    }

    stomp.connect(cCredentials.clientId || '', cCredentials.clientSecret || '',
      () => {
        socket.onclose = _tryReconnect;
        _connectionEstablished(stomp);
      }, () => _tryReconnect())
  };

  _connect();
};

export default configureWebSocket;
