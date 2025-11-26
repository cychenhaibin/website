import type React from "react";

declare module "react-timelines" {
  export interface TimelineItem {
    id?: string | number;
    title?: string;
    description?: string;
    startTime?: Date | string;
    endTime?: Date | string;
  }

  export interface TimelineProps {
    items: TimelineItem[];
    mode?: "HORIZONTAL" | "VERTICAL";
    lineColor?: string;
    scrollable?: boolean;
    onSelect?: (item: TimelineItem) => void;
  }

  const Timeline: React.FC<TimelineProps>;
  export default Timeline;
}


