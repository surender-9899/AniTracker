import { useEffect, useState } from 'react';
import useAxiosPrivate from './useAxiosPrivate';

const useFetchStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosPrivate.get('/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [axiosPrivate]);

  return { stats, loading };
};

export default useFetchStats;
