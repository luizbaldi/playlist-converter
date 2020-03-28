import useReactRouter from "use-react-router";

const useAuthParams = () => {
  const {
    location: { search }
  } = useReactRouter();
  const searchParams = new URLSearchParams(search);
  const accessToken = searchParams.get("access_token");

  return { accessToken };
};

export default useAuthParams;
