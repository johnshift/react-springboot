import { Container } from "@mui/material";

interface Props {
  name: string;
  description: string;
}

const ProfilePage = ({ name, description }: Props) => {
  console.log("description =", description);
  return (
    <Container maxWidth="md">
      <h2>hello {name}!</h2>
      <p>{description}</p>
    </Container>
  );
};

export default ProfilePage;
