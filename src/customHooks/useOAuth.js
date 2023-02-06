import React, { useCallback, useState, useRef } from 'react';

const OAUTH_STATE_KEY = 'react-use-oauth2-state-key';
const POPUP_HEIGHT = 700;
const POPUP_WIDTH = 600;
const OAUTH_RESPONSE = 'react-use-oauth2-response';

const openPopup = (url) => {
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
};

const enhanceAuthorizeUrl = (authorizeUrl, clientId, redirectUri, scope, state) => {
	return `${authorizeUrl}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
}

const saveState = (state: string) => {
	sessionStorage.setItem(OAUTH_STATE_KEY, state);
};

const removeState = () => {
	sessionStorage.removeItem(OAUTH_STATE_KEY);
};

const cleanup = (intervalRef, popupRef, handleMessageListener ) => {
	clearInterval(intervalRef.current);
	closePopup(popupRef);
	removeState();
	window.removeEventListener('message', handleMessageListener);
};

const formatExchangeCodeForTokenServerURL = (serverUrl, clientId, code, redirectUri ) => {
	return `${serverUrl}?${objectToQuery({client_id: clientId, code, redirect_uri: redirectUri,})}`;
};

const objectToQuery = (object) => new URLSearchParams(object).toString()

const useOAuth = (props) => {
	
	const { authorizeUrl, clientId, redirectUri, scope = '' } = props;
	const popupRef = useRef();
	const [{ loading, error }, setUI] = useState({ loading: false, error: null });

	const getAuth = useCallback(() => {

		// 1. Init
		setUI({ loading: true, error: null });

		// 2. Generate and save state
		const state = 'integration';//generateState();
		saveState(state);

		// 3. Open popup
		popupRef.current = openPopup(enhanceAuthorizeUrl(authorizeUrl, clientId, redirectUri, scope, state));

		// 4. Register message listener
		async function handleMessageListener(message) {
			try {
				const type = message && message.data && message.data.type;
				if (type === OAUTH_RESPONSE) {
					const errorMaybe = message && message.data && message.data.error;
					if (errorMaybe) {
						setUI({ loading: false, error: errorMaybe || 'Unknown Error', });
					} else {
						const code = message && message.data && message.data.payload && message.data.payload.code;
						// ... Check next step to see what we'll do with the code

						//const response = await fetch(formatExchangeCodeForTokenServerURL(
						//	'https://your-server.com/token',
						//	clientId,
						//	code,
						//	redirectUri
						//	));
						//if (!response.ok) {
						//	setUI({
						//		loading: false,
						//		error: "Failed to exchange code for token",
						//	});
						//} else {
						//	payload = await response.json();
						//	setUI({
						//		loading: false,
						//		error: null,
						//	});
						//	setData(payload);
							// Lines above will cause 2 rerenders but it's fine for this tutorial :-)
						//}


					}
				}
			} catch (genericError) {
				console.error(genericError);
				setUI({ loading: false, error: genericError.toString(), });
			} finally {
				// Clear stuff ...
				//cleanup(intervalRef, popupRef, handleMessageListener);
			}
		}

		window.addEventListener('message', handleMessageListener);

		// 5. Begin interval to check if popup was closed forcefully by the user
		/*intervalRef.current = setInterval(() => {
			const popupClosed = !popupRef.current || !popupRef.current.window || popupRef.current.window.closed;
			if (popupClosed) {
				// Popup was closed before completing auth...
				setUI((ui) => ({ ...ui, loading: false, }));
				console.warn('Warning: Popup was closed before completing authentication.');
				clearInterval(intervalRef.current);
				removeState();
				window.removeEventListener('message', handleMessageListener);
			}
		}, 250);
		// Remove listener(s) on unmount
		return () => {
			window.removeEventListener('message', handleMessageListener);
			if (intervalRef.current) clearInterval(intervalRef.current);
		};*/
    })

	

	return { loading, getAuth };
}

export default useOAuth