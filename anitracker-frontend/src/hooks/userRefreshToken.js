import axios from '../api/axios'; // adjust if your axios instance is in a different path
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.get('/refresh', {
        withCredentials: true, // important so cookies (refresh token) are sent
      });

      setAuth(prev => {
        return { ...prev, accessToken: response.data.accessToken };
      });

      return response.data.accessToken;
    } catch (err) {
      console.error('Refresh token failed:', err);
      return null;
    }
  };

  return refresh;
};

export default useRefreshToken;
