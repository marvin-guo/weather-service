import jetPaths from 'jet-paths';

const Paths = {
  _: '/api',
  Weather: {
    _: '/weather',
    GetOneCall: '/onecall',
    GetBasic: '/basic',
  }
} as const;

export const JetPaths = jetPaths(Paths);
export default Paths;
