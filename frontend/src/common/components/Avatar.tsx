import { Center, Avatar as AvatarCui } from "@chakra-ui/react";

import Link from "next/link";

type Props = {
  href: string;
  size?: string;
  label: string;
};

const Avatar = ({ href = "#", size = "lg", label }: Props) => {
  return (
    <Center>
      <Link href={href}>
        <a>
          <AvatarCui size={size} iconLabel={label} />
        </a>
      </Link>
    </Center>
  );
};

export default Avatar;
