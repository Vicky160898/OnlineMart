import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
export default function Error(props) {
  const { error } = props;
  return (
    <div>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>{error}!</AlertTitle>
        <AlertDescription>
          {props.children}
          Result Not Found Please Try Again After Some Time!
        </AlertDescription>
      </Alert>
    </div>
  );
}
