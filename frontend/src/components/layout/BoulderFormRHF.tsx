import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { BoulderSchema } from "../../zodSchemas/BoulderSchema";
import { Button, TextField } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import { useAddBoulder } from "../../services";
export type BoulderSchemaValues = z.infer<typeof BoulderSchema>;

export default function BoulderFormRHF() {
  const createBoulderMutation = useAddBoulder();
  // form setup
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BoulderSchemaValues>({ resolver: zodResolver(BoulderSchema) });
  const onSubmit = (data: BoulderSchemaValues) => {
    createBoulderMutation.mutate(data);
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        label="nome boulder"
        margin="normal"
        {...register("name")}
        error={!!errors.name}
        helperText={
          typeof errors.name?.message === "string" ? errors.name.message : ""
        }
      />
      <Button
        variant="contained"
        endIcon={<PublishIcon />}
        type="submit"
        size="large"
        sx={{
          p: {
            xs: "2rem 2rem 2rem 2rem",
            md: "1rem 1rem 1rem 1rem",
          },
        }}
      >
        Inserisci Boulder
      </Button>
    </form>
  );
}
