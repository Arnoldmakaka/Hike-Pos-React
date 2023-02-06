import { useCallback, useState, useRef } from 'react'; 

const OAUTH_STATE_KEY = 'integration';
const POPUP_HEIGHT = 700;
const POPUP_WIDTH = 600;
const OAUTH_RESPONSE = 'react-use-oauth2-response';

const generateState = () => {
  const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let array = new Uint8Array(40);
  window.crypto.getRandomValues(array);
  array = array.map((x: number) => validChars.codePointAt(x % validChars.length));
  const randomState = String.fromCharCode.apply(null, array);
  return randomState;
};

const saveState = (state: string) => {
  sessionStorage.setItem(OAUTH_STATE_KEY, state);
};

const removeState = () => {
  sessionStorage.removeItem(OAUTH_STATE_KEY);
};

const openPopup = (url) => {
  // To fix issues with window.screen in multi-monitor setups, the easier option is to
  // center the pop-up over the parent window.
  const top = window.outerHeight / 2 + window.screenY - POPUP_HEIGHT / 2;
  const left = window.outerWidth / 2 + window.screenX - POPUP_WIDTH / 2;
  return window.open(
    url,
    'OAuth2 Popup',
    `height=${POPUP_HEIGHT},width=${POPUP_WIDTH},top=${top},left=${left}`
  );
}

const closePopup = (popupRef) => {
  popupRef.current?.close();
}

const cleanup = ( intervalRef, popupRef, handleMessageListener ) => {
  clearInterval(intervalRef.current);
  closePopup(popupRef);
  removeState();
  window.removeEventListener('message', handleMessageListener);
}

const enhanceAuthorizeUrl = (authorizeUrl, clientId, redirectUri, scope, state) => {
  return `${authorizeUrl}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
}



export const useOAuth2 = (props) => {
  
  const { authorizeUrl, clientId, redirectUri, scope = '' } = props;
  const popupRef = useRef();
  const [{ loading, error }, setUI] = useState({ loading: false, error: null });

  const getAuth = useCallback(() => {
    
    // 1. Init
    setUI({ loading: true, error: null });

    // 2. Generate and save state
    const state = OAUTH_STATE_KEY;//generateState();
    saveState(state);

    // 3. Open popup
    popupRef.current = openPopup(enhanceAuthorizeUrl(authorizeUrl, clientId, redirectUri, scope, state));

  })
}