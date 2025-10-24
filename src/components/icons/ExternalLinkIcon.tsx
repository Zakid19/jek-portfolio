import React from "react";

export const ExternalLinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 4.5H19.5V10.5M10.5 13.5L19.5 4.5M5.25 19.5H18.75"
    />
  </svg>
);
