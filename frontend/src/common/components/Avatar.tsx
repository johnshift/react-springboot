import { Center, Avatar as AvatarCui } from "@chakra-ui/react";

import Link from "next/link";

type Props = {
  href: string;
  size?: string;
};

const Avatar = ({ href = "#", size = "lg" }: Props) => {
  return (
    <Center>
      <Link href={href}>
        <a>
          <AvatarCui size={size} />
        </a>
      </Link>
    </Center>
  );
};

export default Avatar;
