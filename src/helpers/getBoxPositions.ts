export const getBoxPositions = (startId: string, endId: string) => {
  const b1 = document.getElementById(startId)?.getBoundingClientRect();
  const b2 = document.getElementById(endId)?.getBoundingClientRect();

  const boxTop = b1!.top < b2!.top ? b1 : b2;
  const boxLeft = b1!.left < b2!.left ? b1 : b2;

  return {
    boxTop,
    boxBottom: boxTop === b1 ? b2 : b1,
    boxLeft,
    boxRight: boxLeft === b1 ? b2 : b1,
  };
};
