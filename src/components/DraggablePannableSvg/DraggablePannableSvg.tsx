"use client";

import {
  Dispatch,
  FC,
  SetStateAction,
  SVGProps,
  useEffect,
  useRef,
  useState,
  WheelEventHandler,
} from "react";
import styles from "./DraggablePannableSvg.module.scss";

const bounded = (n: number, max: number, min: number) =>
  Math.min(max, Math.max(min, n));

interface DraggablePannableSvgProps extends SVGProps<SVGSVGElement> {
  width: number;
  height: number;
  setMoved: Dispatch<SetStateAction<boolean>>;
}

const STEPS = 5;
const MS = 5;

const DraggablePannableSvg: FC<DraggablePannableSvgProps> = ({
  width,
  height,
  setMoved,
  children,
  style = {},
  className,
  ...props
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  // const [tpCache, setTpCache] = useState<Array<React.Touch>>([]);
  const [scale, setScale] = useState(0);
  const [cursor, setCursor] = useState("pointer");

  let handleX = -1;
  let handleY = -1;

  useEffect(() => {
    if (typeof window === "undefined") return;

    setScale(Math.max(window.innerWidth / width, window.innerHeight / height));

    const resizeIfNecessary = () => {
      if (window === undefined) return;

      const minScale = Math.max(
        window.innerWidth / width,
        window.innerHeight / height
      );
      const boundedScale = bounded(scale, 1, minScale);

      setScale(boundedScale);
      setTop(0);
      setLeft(0);
    };

    resizeIfNecessary();

    window.addEventListener("resize", resizeIfNecessary);

    return () => {
      window?.removeEventListener("resize", resizeIfNecessary);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dragHandler = (e: MouseEvent) => {
    e.preventDefault();
    setCursor("grabbing");

    if (wrapperRef.current === null) {
      throw Error(
        "Attempted to get bounds and mouse position while a ref was null"
      );
    }

    setMoved(true);

    // GET BOUNDS:
    const wrapperWidth = wrapperRef.current.clientWidth;
    const wrapperHeight = wrapperRef.current.clientHeight;
    const dragWidth = width * scale;
    const dragHeight = height * scale;

    // GET LEFT AND TOP OFFSETS:
    const mousePositionX = e.pageX - handleX * scale;
    const mousePositionY = e.pageY - handleY * scale;

    setLeft(bounded(mousePositionX, 0, wrapperWidth - dragWidth));
    setTop(bounded(mousePositionY, 0, wrapperHeight - dragHeight));
  };

  const touchDragHandler = (e: TouchEvent) => {
    e.preventDefault();

    if (wrapperRef.current === null) {
      throw Error(
        "Attempted to get bounds and mouse position while a ref was null"
      );
    }

    if (e.targetTouches.length === 2) {
      if (e.changedTouches.length !== 2) return;
      // TODO: Handle pinch
    } else {
      // setTpCache([]);
    }
    if (e.targetTouches.length === 1) {
      setMoved(true);

      // GET BOUNDS:
      const wrapperWidth = wrapperRef.current.clientWidth;
      const wrapperHeight = wrapperRef.current.clientHeight;
      const dragWidth = width * scale;
      const dragHeight = height * scale;

      // GET LEFT AND TOP OFFSETS:
      const { screenX, screenY } = e.changedTouches[0];
      const mousePositionX = screenX - handleX * scale;
      const mousePositionY = screenY - handleY * scale;

      setLeft(bounded(mousePositionX, 0, wrapperWidth - dragWidth));
      setTop(bounded(mousePositionY, 0, wrapperHeight - dragHeight));
    }
  };

  const closeDragEvent = () => {
    setCursor("grab");
    document.onmouseup = null;
    document.onmousemove = null;
  };

  const animateZoom = (
    scaleDiff: number,
    topDiff: number,
    leftDiff: number
  ) => {
    scaleDiff /= STEPS;
    topDiff /= STEPS;
    leftDiff /= STEPS;
    for (let ms = 0; ms < STEPS; ++ms) {
      setTimeout(() => {
        setScale(scale + scaleDiff * ms);
        setTop(top + topDiff * ms);
        setLeft(left + leftDiff * ms);
      }, ms * MS);
    }
  };

  const handleWheelEvent: WheelEventHandler<SVGSVGElement> = (e) => {
    if (
      typeof window === "undefined" ||
      wrapperRef.current === null ||
      left === undefined ||
      top === undefined
    ) {
      return;
    }

    const wrapperWidth = wrapperRef.current.clientWidth;
    const wrapperHeight = wrapperRef.current.clientHeight;
    const newScale = bounded(
      scale + (e.deltaY < 0 ? 0.1 : -0.1),
      1,
      Math.max(window.innerWidth / width, window.innerHeight / height)
    );
    const widthChange =
      (((e.nativeEvent.pageX - left) * (1 / scale)) / width) *
      Math.round(width * newScale - width * scale);
    const heightChange =
      (((e.nativeEvent.pageY - top) * (1 / scale)) / height) *
      Math.round(height * newScale - height * scale);
    const newTop = bounded(
      top - heightChange,
      0,
      -(height * newScale - wrapperHeight)
    );
    const newLeft = bounded(
      left - widthChange,
      0,
      -(width * newScale - wrapperWidth)
    );

    animateZoom(newScale - scale, newTop - top, newLeft - left);
  };

  useEffect(() => {
    if (wrapperRef.current === null) return;
    const resizeObserver = new ResizeObserver((entries) => {
      const wrapperHeight = entries[0].target.clientHeight;
      setScale((s) => {
        setTop((curr) => {
          const dragHeight = height * s;
          return bounded(curr, 0, -(dragHeight - wrapperHeight));
        });
        return s;
      });
    });
    resizeObserver.observe(wrapperRef.current);
    return () => resizeObserver.disconnect();
  }, [height]);

  return (
    <div ref={wrapperRef} className={styles.OverflowWrapper}>
      <svg
        style={{
          ...style,
          top: top === undefined ? "auto" : `${top}px`,
          left: left === undefined ? "auto" : `${left}px`,
          transform: `scale(${scale})`,
          cursor,
        }}
        className={`${className} ${styles.drag}`}
        {...props}
        onMouseDown={(e) => {
          e.preventDefault();
          handleX = Math.round((e.nativeEvent.pageX - left) * (1 / scale));
          handleY = Math.round((e.nativeEvent.pageY - top) * (1 / scale));
          setMoved(false);
          document.onmouseup = closeDragEvent;
          document.onmousemove = dragHandler;
        }}
        onWheel={handleWheelEvent}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        onTouchStart={(e) => {
          e.preventDefault();
          const { screenX, screenY } = e.nativeEvent.changedTouches[0];
          // setTpCache((curr) => [...curr, ...Array.from(e.targetTouches)]);
          handleX = Math.round((screenX - left) * (1 / scale));
          handleY = Math.round((screenY - top) * (1 / scale));
          setMoved(false);
          document.ontouchend = closeDragEvent;
          document.ontouchmove = touchDragHandler;
        }}
      >
        {children}
      </svg>
    </div>
  );
};

export default DraggablePannableSvg;
