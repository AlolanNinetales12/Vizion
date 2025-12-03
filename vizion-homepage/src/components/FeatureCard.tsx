import React from "react";
import { IconType } from "react-icons";

type Props = {
  Icon: IconType;
  title: string;
  description?: string;
};

const FeatureCard: React.FC<Props> = ({ Icon, title, description }) => {
  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-blue-950 border border-blue-800 rounded-xl p-6 text-center hover:shadow-lg hover:shadow-blue-500/20 transition">
      <div className="text-4xl text-blue-300 mb-3 inline-block">
        <Icon />
      </div>
      <h3 className="text-lg font-semibold text-blue-200 mb-2">{title}</h3>
      <p className="text-blue-400 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
