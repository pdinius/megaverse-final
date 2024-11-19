import { FC } from "react";

interface DividerProps {}

const Divider: FC<DividerProps> = () => {
  return <div style={{ height: 0, width: "100%", borderBottom: "1px dashed #aaa"}}/>
}

export default Divider