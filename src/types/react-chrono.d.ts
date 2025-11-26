import type React from "react";

declare module "react-chrono" {
  export interface ChronoItem {
    title?: string;
    cardTitle?: string;
    cardSubtitle?: string;
    cardDetailedText?: string | string[];
  }

  export interface ChronoProps {
    items: ChronoItem[];
    mode?: "HORIZONTAL" | "VERTICAL" | "VERTICAL_ALTERNATING";
    slideShow?: boolean;
    cardHeight?: number;
    scrollable?: { scrollbar?: boolean };
    theme?: {
      primary?: string;
      secondary?: string;
      cardBgColor?: string;
      cardForeColor?: string;
      titleColor?: string;
    };
    allowDynamicUpdate?: boolean;
  }

  export const Chrono: React.FC<ChronoProps>;
}



