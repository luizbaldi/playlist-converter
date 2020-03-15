import { useLocation } from 'react-router-dom';

const useAuthParams = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const accessToken = searchParams.get('access_token');

  return { accessToken };
};

export default useAuthParams;
