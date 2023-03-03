import React from "react";
import { Spinner } from "@chakra-ui/react";
export default function Loading() {
  return (
    <>
      <Spinner
        thickness="6px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="lg"
        m={"150px auto"}
      />
    </>
  );
}
