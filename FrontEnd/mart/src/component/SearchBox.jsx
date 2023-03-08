import React, { useState } from "react";
import { Input, IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
export default function SearchBox() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(query)
    navigate(query ? `/search/?query=${query}` : "/search");
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Basic usage"
          w={"300px"}
          border={"1px grey solid"}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconButton
          colorScheme="yellow"
          aria-label="Search database"
          icon={<SearchIcon />}
          type="submit"
        />
      </form>
    </div>
  );
}
