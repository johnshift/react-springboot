import { Container } from "@mui/material";

interface Props {
  name: string;
  description?: string;
}

const ProfilePage = ({
  name,
  description = "Click to edit description",
}: Props) => {
  return (
    <Container maxWidth="md">
      <h2>hello {name}!</h2>
      <p>{description}</p>
    </Container>
  );
};

export default ProfilePage;
