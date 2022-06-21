import React, { useState } from 'react';

import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../../src/components/ImageEditor/imageEditor"),
  { ssr: false }
);

export default function Editor() {
  const [url, setUrl] = useState("img/sampleImage.jpg");
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "5%",
      }}
    >
      {url && <DynamicComponentWithNoSSR url={url} />}
    </div>
  );
}
