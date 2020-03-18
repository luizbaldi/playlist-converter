import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { useAuthParams } from "../../hooks";
import { AuthContext } from "../../contexts";

type Props = {
  auth: "spotify" | "youtube";
};

const AuthRedirect = ({ auth }: Props) => {
  const { setSpotifyToken, setYoutubeToken } = useContext(AuthContext);
  const { accessToken } = useAuthParams();

  useEffect(() => {
    switch (auth) {
      case "spotify":
        setSpotifyToken(accessToken || "");
        break;
      case "youtube":
        setYoutubeToken(accessToken || "");
        break;
      default:
        break;
    }
  }, [auth, accessToken, setSpotifyToken, setYoutubeToken]);

  return <Redirect to="/" />;
};

export default AuthRedirect;
