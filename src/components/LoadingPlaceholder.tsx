import PlaceholderLoading from 'react-placeholder-loading';

interface Props {
  width?: number | string;
  height?: number | string;
  colorStart?: string;
  colorEnd?: string;
}

const LoadingPlaceholder = (props: Props) => (
  <PlaceholderLoading shape="rect" colorStart="white" width="100%" height="100%" {...props} />
);

export default LoadingPlaceholder;
