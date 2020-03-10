import { useLocation } from 'react-router-dom';

const useAuthParams = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const code = searchParams.get('code');

  return { code };
};

export default useAuthParams;
