import React from "react";
import { Composition } from "remotion";
import { FPS } from "../plan";
import { DemoVideo, type DemoVideoProps } from "./DemoVideo";

const empty: DemoVideoProps = {
  title: "",
  plan: {
    totalFrames: 1,
    width: 1920,
    height: 1080,
    segments: [],
    zooms: [],
    captions: [],
  },
};
const metadata = ({ props }: { props: DemoVideoProps }) => ({
  durationInFrames: props.plan.totalFrames,
});

export function Root() {
  return (
    <>
      <Composition
        id="Wide"
        component={DemoVideo}
        width={1920}
        height={1080}
        fps={FPS}
        durationInFrames={1}
        defaultProps={empty}
        calculateMetadata={metadata}
      />
      <Composition
        id="Tall"
        component={DemoVideo}
        width={1080}
        height={1920}
        fps={FPS}
        durationInFrames={1}
        defaultProps={empty}
        calculateMetadata={metadata}
      />
      <Composition
        id="Phone"
        component={DemoVideo}
        width={1080}
        height={1920}
        fps={FPS}
        durationInFrames={1}
        defaultProps={{ ...empty, phone: true }}
        calculateMetadata={metadata}
      />
    </>
  );
}
