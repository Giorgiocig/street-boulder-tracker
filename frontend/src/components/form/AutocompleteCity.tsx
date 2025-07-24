import { useState, useEffect } from "react";
import { TextField, CircularProgress } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import type { NominatimCity } from "../../utilities";

export const AutocompleteCity = ({
  value,
  onSelect,
}: {
  value: string;
  onSelect: (arg: { name: string; lat: number; lng: number }) => void;
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [options, setOptions] = useState<NominatimCity[]>([]);
  const [selectedOption, setSelectedOption] = useState<NominatimCity | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  // Update inputValue if value changes externally
  useEffect(() => {
    if (value && value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  // Do not fetch if input is equal to the selection
  useEffect(() => {
    if (selectedOption?.display_name === inputValue) {
      return;
    }

    const controller = new AbortController();

    const fetchCities = async () => {
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
        if (error instanceof DOMException && error.name === "AbortError")
          return;
      } finally {
        setLoading(false);
      }
    };

    fetchCities();

    return () => controller.abort();
  }, [inputValue, selectedOption]);

  const handleChange = (_event: any, newValue: NominatimCity | null) => {
    setSelectedOption(newValue);
    if (newValue) {
      onSelect({
        name: newValue.display_name,
        lat: parseFloat(newValue.lat),
        lng: parseFloat(newValue.lon),
      });
      // Synchro inputValue with the selection
      setInputValue(newValue.display_name);
    } else {
      setInputValue("");
    }
  };

  return (
    <Autocomplete<NominatimCity>
      filterOptions={(x) => x} // bypass client filter
      options={options}
      value={selectedOption}
      inputValue={inputValue}
      getOptionLabel={(option) => option.display_name || ""}
      loading={loading}
      onChange={handleChange}
      onInputChange={(_, newInputValue, reason) => {
        // Update inputValue only if the input changes - typing
        if (reason === "input") {
          setInputValue(newInputValue);
          // Deselct the option if user changes option manually
          if (selectedOption && newInputValue !== selectedOption.display_name) {
            setSelectedOption(null);
          }
        }
      }}
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
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
