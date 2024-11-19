import { CSSProperties, FC, useContext } from "react";
import { statusContext } from "../../../StatusContext";
import { combinedPaths } from "../../../lib/svg-info";
import { PATH_COLOR } from "../../../lib/constants";

const styleProps: CSSProperties = {
  mixBlendMode: "multiply",
  fillRule: "evenodd",
};

const Paths: FC = () => {
  const { connected } = useContext(statusContext);

  return connected.map((pathKey, i) => {
    const props = combinedPaths[pathKey];

    return Array.isArray(props) ? (
      <g key={i} style={{ ...styleProps }}>
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
      />
    );
  });
};

export default Paths;