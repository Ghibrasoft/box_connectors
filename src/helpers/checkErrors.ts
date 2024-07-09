const DOCS_LINK =
  "Please read docs: https://www.npmjs.com/package/@ghibrasoft/box-connector";
export const checkErrors = (
  dublicatedConnections: boolean,
  isRightFirst: boolean,
  isUnderEachOther: boolean
) => {
  if (dublicatedConnections) {
    console.error(`The start and end boxes cannot be the same. (${DOCS_LINK})`);
    return true;
  }
  if (isRightFirst) {
    console.error(
      `The end box must be to the right of the start box. (${DOCS_LINK})`
    );
    return true;
  }
  if (isUnderEachOther) {
    console.error(
      `The end box cannot be directly below each other. (${DOCS_LINK})`
    );
    return true;
  }
  return false;
};
