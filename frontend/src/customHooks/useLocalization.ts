import { useState } from "react";
import type { LocalizationType } from "../utilities/types";

export function useGeolocation() {
  const [geolocation, setGeolocation] = useState<LocalizationType | null>(null);
  const [errorGeolocation, setErrorGeoLocation] = useState<string | null>(null);
  const [loadingGeolocation, setLoadingGeolocation] = useState(false);

  const refreshGeolocation = () => {
    if (!navigator.geolocation) {
      setErrorGeoLocation("Geolocalizzazione non supportata.");
      return;
    }

    setLoadingGeolocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeolocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoadingGeolocation(false);
        setErrorGeoLocation(null);
      },
      (err) => {
        setErrorGeoLocation(err.message);
        setLoadingGeolocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  return {
    geolocation,
    errorGeolocation,
    loadingGeolocation,
    refreshGeolocation,
  };
}
