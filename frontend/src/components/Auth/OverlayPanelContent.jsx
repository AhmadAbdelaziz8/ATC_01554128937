import React from "react";

const OverlayPanelContent = ({
  title,
  description,

}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-8 text-center">
      <h1 className="text-3xl font-bold text-white mb-3">{title}</h1>
      <p className="text-sm leading-relaxed text-gray-200 mb-6">
        {description}
      </p>
    </div>
  );
};

export default OverlayPanelContent;
