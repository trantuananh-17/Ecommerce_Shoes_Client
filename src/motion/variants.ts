import { type Transition, type Variants } from "framer-motion";

export const fadeIn = (
  direction: "up" | "down" | "left" | "right" | "center",
  delay: number
): Variants => {
  return {
    hidden: {
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 1,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      } as Transition,
    },
  };
};

export const fadeInFast = (
  direction: "up" | "down" | "left" | "right" | "center",
  delay: number
): Variants => {
  return {
    hidden: {
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      } as Transition,
    },
  };
};

export const listDrawer = {
  enter: {
    height: "auto",
    opacity: 1,
    overflow: "hidden",
    transition: { duration: 0.3 },
  },
  exit: {
    height: 0,
    opacity: 0,
    overflow: "hidden",
    transition: { duration: 0.2 },
  },
};

export const subMenuDrawer = {
  enter: {
    height: "auto",
    overflow: "hidden",
    transition: { duration: 0.2 },
  },
  exit: {
    height: 0,
    overflow: "hidden",
    transition: { duration: 0.2 },
  },
};
