import React from "react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
const SamplesPage = () => {
  return (
    <Button>
      <Link href="./samples/create/">Create</Link>
    </Button>
  );
};

export default SamplesPage;
