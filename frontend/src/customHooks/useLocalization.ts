import { useEffect, useState } from "react";
import type { LocalizationType } from "../utilities/types";

export function useGeolocation(isLocationRequested: boolean) {
  const [geolocation, setGeolocation] = useState<LocalizationType | null>(null);
  const [errorGeolocation, setErrorGeoLocation] = useState<string | null>(null);
  const [loadingGeolocation, setLoadingGeolocation] = useState(false);

  useEffect(() => {
    if (!isLocationRequested) return;

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
  }, [isLocationRequested]);

  return { geolocation, errorGeolocation, loadingGeolocation };
}
