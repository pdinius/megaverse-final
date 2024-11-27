import { CSSProperties, FC, useContext } from "react";
import { statusContext } from "../../../StatusContext";
import { PATH_COLOR } from "../../../lib/constants";
import { combinedPaths } from "../../../lib/svg-info";
import { TypedEntries } from "../../../lib/utils";

const styleProps: CSSProperties = {
  mixBlendMode: "multiply",
  fillRule: "evenodd",
};

const Paths: FC = () => {
  const { getPathSVGPathInfo } = useContext(statusContext);

  return getPathSVGPathInfo().map((props, i) => {
    // return TypedEntries(combinedPaths).map(([key, props], i) => {
    const onClick = () => {
      // navigator ? navigator.clipboard.writeText(key) : null;
    };
    return Array.isArray(props) ? (
      <g key={i} style={{ ...styleProps }} onClick={onClick}>
        {props.map((sub, j) => (
          <path key={j} d={sub.d} fill={sub.fill || PATH_COLOR} />
        ))}
      </g>
    ) : (
      <path
        key={i}
        style={{ ...styleProps }}
        d={props.d}
        fill={props.fill || PATH_COLOR}
        onClick={onClick}
      />
    );
  });
};

export default Paths;
