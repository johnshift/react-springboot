import { Skeleton as MuiSkeleton, SkeletonTypeMap } from "@mui/material";

interface Props {
  height: number | string;
  width: number | string;
  borderRadius?: number | string;
  variant?: SkeletonTypeMap["props"]["variant"];
}

const Skeleton = ({
  height,
  width,
  borderRadius = "10px",
  variant = "rectangular",
}: Props) => {
  return (
    <MuiSkeleton
      variant={variant}
      sx={{
        height,
        width,
        borderRadius,
      }}
      animation="wave"
    />
  );
};

export default Skeleton;
