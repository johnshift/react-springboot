import React, { useState } from "react";
import { Box, Heading, Skeleton, Text } from "@chakra-ui/react";
import { PassProps } from "./index.page.server";

export const TRIAL_PAGE_EXPORTED = "im from trial page file";

export const Page = ({ msgFromServerPage }: PassProps) => {
  const [isLoading, setIsLoading] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);

  // turn isLoading to false after four seconds?
  setTimeout(() => {
    setIsLoading(false);
  }, 1);

  // setIsLoading(false);
  return (
    <Box>
      <h1>Message: {msgFromServerPage}</h1>
      <Skeleton isLoaded={!isLoading}>
        <Heading>I am BATMAN</Heading>
        <Text>I like black.</Text>
      </Skeleton>
    </Box>
  );
};
