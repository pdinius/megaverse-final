import { FC } from "react";
import { TAGS } from "../../../types/general";
import ResourceInfo from "../ResourceInfo/ResourceInfo";

const Resources: FC = () => {
  return TAGS.map((t, i) => <ResourceInfo key={i} item={t} />);
};

export default Resources;
