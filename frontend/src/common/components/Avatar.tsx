import { Center, Avatar as AvatarCui, AvatarBadge } from "@chakra-ui/react";

import Link from "next/link";

type Props = {
  href?: string;
  size?: string;
  label: string;
  badgeContent?: string;
};

const Avatar = ({ href = "#", size = "lg", label, badgeContent }: Props) => {
  return (
    <Center>
      <Link href={href}>
        <a>
          {badgeContent === undefined ? (
            <AvatarCui size={size} iconLabel={label} />
          ) : (
            <AvatarCui size={size} iconLabel={label}>
              <AvatarBadge border="none">{badgeContent}</AvatarBadge>
            </AvatarCui>
          )}
        </a>
      </Link>
    </Center>
  );
};

export default Avatar;
