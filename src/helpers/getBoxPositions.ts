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
      bottom: startBoxRect.bottom + scrollTop,
      height: startBoxRect.height,
      left: startBoxRect.left + scrollLeft,
      right: startBoxRect.right + scrollLeft,
    },
    boxBottom: {
      top: endBoxRect.top + scrollTop,
      bottom: endBoxRect.bottom + scrollTop,
      height: endBoxRect.height,
      left: endBoxRect.left + scrollLeft,
      right: endBoxRect.right + scrollLeft,
    },
    boxLeft: {
      top: startBoxRect.top + scrollTop,
      bottom: startBoxRect.bottom + scrollTop,
      left: startBoxRect.left + scrollLeft,
      right: startBoxRect.right + scrollLeft,
      height: startBoxRect.height,
    },
    boxRight: {
      top: endBoxRect.top + scrollTop,
      bottom: endBoxRect.bottom + scrollTop,
      left: endBoxRect.left + scrollLeft,
      right: endBoxRect.right + scrollLeft,
      height: endBoxRect.height,
    },
  };
};
