import { Container } from "@mui/material";

interface Props {
  name: string;
  description: string;
}

const VeilProfilePage = ({ name, description }: Props) => {
  console.log("description =", description);
  return (
    <Container maxWidth="md">
      <h2>who are you {name}?</h2>
      <p>{description}</p>
    </Container>
  );
};

export default VeilProfilePage;
