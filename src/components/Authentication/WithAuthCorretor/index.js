import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import FullPageLoader from '../../FullPageLoader';
import api from '../../../utils/api';

const withAuthCorretor = (Component, redaction_id) => {
  function AuthenticatedComponent() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const verify = async () => {
      try {
        const response = await api.get('session');
        if (response?.data?.user?.type !== 'Corretor') {
          router.push('/404');
        } else {
          setLoading(false);
        }
      } catch (error) {
        router.push('/404');
      }
    };

    useEffect(() => {
      verify();
    }, []);

    return loading ? <FullPageLoader /> : <Component redaction_id={redaction_id} />; // Render whatever you want while the authentication occurs
  }

  return AuthenticatedComponent;
};
export default withAuthCorretor;
