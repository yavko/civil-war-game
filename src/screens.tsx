import React, { useState } from "react";
import { Button } from "@chakra-ui/react";

export const side = () => {
  return (
    <div>
      <h2>Union or Confediracy</h2>
      <Button onClick={() => localStorage.setItem("side", "union")}>
        Union
      </Button>
      <Button onClick={() => localStorage.setItem("side", "confederacy")}>
        Confederacy
      </Button>
    </div>
  );
};
