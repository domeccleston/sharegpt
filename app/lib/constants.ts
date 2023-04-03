export const FADE_IN_ANIMATION_SETTINGS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

export const FRAMER_MOTION_LIST_ITEM_VARIANTS = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { type: "spring" } },
};

export const FRAMER_MOTION_COMMENT_BUBBLE_VARIANTS = {
  hidden: { translateX: 5, opacity: 0 },
  show: { translateX: 0, opacity: 1, transition: { type: "spring" } },
};

export const PAGINATION_LIMIT = 50;
