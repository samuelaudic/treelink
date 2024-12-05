import React from "react";

interface TitleLabelProps {
  title: string;
  titleSize: string;
  description: string;
  icon?: JSX.Element;
}

export const TitleLabel: React.FC<TitleLabelProps> = ({
  title,
  titleSize,
  description,
  icon,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-4">
        {icon ? icon : null}
        <p
          className={`text-${titleSize} font-semibold tracking-tight text-foreground`}
        >
          {title}
        </p>
      </div>
      <p>{description}</p>
    </div>
  );
};
