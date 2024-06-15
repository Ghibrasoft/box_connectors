type BoxType = {
  id: string;
  top: number;
  left: number;
};

interface IGenerateBoxesProps {
  boxQuantity: number;
  width: number;
  height: number;
  cols: number;
  gap: number;
  initialTop: number;
  initialLeft: number;
}
export const generateBoxes = ({
  boxQuantity,
  width,
  height,
  cols,
  gap,
  initialTop,
  initialLeft,
}: IGenerateBoxesProps): BoxType[] => {
  let boxes: BoxType[] = [];
  let index = 0;
  let row = 0;
  let col = 0;

  // loop until we have generated boxQuantity number of boxes
  while (index < boxQuantity) {
    boxes.push({
      id: `box${index}`,
      top: initialTop + row * (height + gap),
      left: initialLeft + col * (width + gap),
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
