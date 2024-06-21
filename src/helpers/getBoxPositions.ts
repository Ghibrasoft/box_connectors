export const getBoxPositions = (startId: string, endId: string) => {
  const startBox = document.getElementById(startId);
  const endBox = document.getElementById(endId);

  if (!startBox || !endBox) {
    throw new Error("One or both of the boxes were not found.");
  }

  const startBoxRect = startBox.getBoundingClientRect();
  const endBoxRect = endBox.getBoundingClientRect();

  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  return {
    boxTop: {
      top: startBoxRect.top + scrollTop,
      height: startBoxRect.height,
    },
    boxBottom: {
      bottom: endBoxRect.bottom + scrollTop,
      height: endBoxRect.height,
    },
    boxLeft: {
      left: startBoxRect.left + scrollLeft,
      right: startBoxRect.right + scrollLeft,
      top: startBoxRect.top + scrollTop,
      height: startBoxRect.height,
    },
    boxRight: {
      left: endBoxRect.left + scrollLeft,
      right: endBoxRect.right + scrollLeft,
      top: endBoxRect.top + scrollTop,
      height: endBoxRect.height,
    },
  };
};
