import { useGetBoulderImages } from "../../services/BoulderImage/queries/queries";
import { useBoulderId } from "../../customHooks/useBoulderId";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

type Props = {};

export default function ImageDisplayerStep({}: Props) {
  const { boulderIdCtx } = useBoulderId();
  const getBoulderImage = useGetBoulderImages(Number(boulderIdCtx));
  const res = getBoulderImage.data;
  if (!res) return;
  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {res.map((item) => (
        <ImageListItem key={item.url}>
          <img
            srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
