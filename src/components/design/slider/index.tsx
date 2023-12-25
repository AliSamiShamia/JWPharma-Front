import React, { ReactNode } from "react";
import { Slide } from "react-slideshow-image";
import { Responsive } from "react-slideshow-image/dist/types";

function ResponsiveSlider({
  children,
  indicators,
  slidesToScroll,
  slidesToShow,
  autoplay,
  arrows,
  responsiveSettings,
}: {
  children: ReactNode;
  indicators?: boolean;
  slidesToScroll?: number;
  slidesToShow?: number;
  arrows?: boolean;
  autoplay?: boolean;
  responsiveSettings?: Responsive[] | undefined;
}) {
  return (
    <Slide
      arrows={arrows}
      indicators={indicators}
      slidesToScroll={slidesToScroll}
      slidesToShow={slidesToShow}
      responsive={responsiveSettings}
      autoplay={autoplay}
      infinite={false}
    >
      {children}
    </Slide>
  );
}

export default ResponsiveSlider;
