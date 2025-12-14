import { config } from "@/config/config";
import { useState } from "react";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

function ZoomImage({ img, baseUrl = true, width = "100%", height = "200px" }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const imgurl = !baseUrl ? img : config.fileBaseUrl + img;

  return (
    <ControlledZoom
      isZoomed={isZoomed}
      onZoomChange={setIsZoomed}
      overlayBgColorEnd="rgba(0,0,0,0.9)"
      wrapStyle={{ width: "100%", height: "100%" }}
      zoomMargin={0}
    >
      <img
        alt="submission_image"
        src={imgurl}
        style={{
          width: isZoomed ? "auto" : width,
          height: isZoomed ? "auto" : height,
          cursor: "zoom-in",
          objectFit: "contain",
        }}
      />
    </ControlledZoom>
  );
}

export default ZoomImage;
