import { styled } from "@linaria/react";
import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router/match";

const Title = styled.h1`
  color: red;
  text-decoration: underline;
`;

const Header: FunctionalComponent = () => {
  return (
    <header>
      <Title>Preact App</Title>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/profile">Me</Link>
        <Link href="/profile/john">John</Link>
      </nav>
    </header>
  );
};

export default Header;
