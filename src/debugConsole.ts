import util from 'util';
// import prettyFormat from 'pretty-format';

export const debugConsole = (obj: Record<string, unknown>) => {
  // eslint-disable-next-line
  console.log(
    util.inspect(obj, {
      showHidden: false,
      depth: null,
      colors: true,
      showProxy: false,
    }),
  );
  // eslint-disable-next-line
  // console.log(prettyFormat(obj));
};
