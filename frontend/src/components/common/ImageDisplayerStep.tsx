import { useGetBoulderImages } from "../../services/BoulderImage/queries/queries";
import { useBoulderId } from "../../customHooks/useBoulderId";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function ImageDisplayerStep() {
  const { boulderIdCtx } = useBoulderId();
  const getBoulderImage = useGetBoulderImages(Number(boulderIdCtx));
  const boulderImgsData = getBoulderImage.data;
  console.log(boulderImgsData);
  if (!boulderImgsData) return;
  return (
    <ImageList sx={{ width: "100%", height: 500 }} cols={8} rowHeight={250}>
      {boulderImgsData.map((item) => (
        <ImageListItem key={item.url}>
          <img srcSet={`${item.url}`} src={`${item.url}`} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
