import { useState, useEffect } from "react";
import { TextField, CircularProgress } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import type { NominatimCity } from "../../utilities";

export const AutocompleteCity = ({
  onSelect,
}: {
  onSelect: (arg: { name: string; lat: number; lng: number }) => void;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCities = async () => {
      if (inputValue.length < 3) return;

      setLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
            inputValue
          )}&format=json&limit=5&addressdetails=1`,
          { signal: controller.signal, headers: { "Accept-Language": "it" } }
        );
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCities();

    return () => controller.abort();
  }, [inputValue]);

  const handleChange = (_event: any, newValue: NominatimCity | null) => {
    if (newValue) {
      onSelect({
        name: newValue.display_name,
        lat: parseFloat(newValue.lat),
        lng: parseFloat(newValue.lng),
      });
    }
  };

  return (
    <Autocomplete<NominatimCity>
      filterOptions={(x) => x} // evita il filtro client-side
      options={options}
      getOptionLabel={(option) => option.display_name || ""}
      loading={loading}
      onChange={handleChange}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Inserisci una città"
          variant="outlined"
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
