export const generateBoxes = (
  boxQuantity: number,
  cols: number,
  gap: number,
  initialTop: number,
  initialLeft: number
) => {
  let boxes = [];
  let index = 0;
  let row = 0;
  let col = 0;

  // loop until we have generated boxQuantity number of boxes
  while (index < boxQuantity) {
    boxes.push({
      id: `box${index}`,
      top: initialTop + row * gap,
      left: initialLeft + col * gap,
    });

    // move to the next column and row
    col++;
    if (col >= cols) {
      col = 0;
      row++;
    }

    index++;
  }
  return boxes;
};
