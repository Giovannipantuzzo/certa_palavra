import React, { useState, useRef } from "react";

import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../../src/components/ImageEditor/imageEditor"),
  { ssr: false }
);

export default function Editor() {
  const [url, setUrl] = useState("https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/526px-Wikipedia-logo-v2.svg.png");
  return (
    <div
      style={{
        width: "100vw",
        height: "125vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "5%",
      }}
    >
      {url && <DynamicComponentWithNoSSR url={url} />}
    </div>
  );
}