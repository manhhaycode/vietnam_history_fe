import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function GoogleOAuthCallbackPage() {
  const location = useLocation();

  useEffect(() => {
    window.opener.postMessage(location.search, window.location.origin);
    window.close();
  }, [location.search]);

  return null;
}
