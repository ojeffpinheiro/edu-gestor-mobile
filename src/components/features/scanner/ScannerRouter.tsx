import PermissionRequestCard from "./PermissionRequestCard";

const ScannerRouter = ({ status, colors, ...props }) => {
  const routes = {
    denied: <PermissionRequestCard isError />,
    undetermined: <PermissionRequestCard isError={false} />,
    granted: <ScannerMainView {...props} />,
    loading: <LoadingView colors={colors} />
  };
  
  switch (permissionStatus) {
    case 'denied':
      return <PermissionRequestCard isError />;
    case 'undetermined':
      return <PermissionRequestCard isError={false} />;
    case 'granted':
      return hasPermission === false 
        ? <PermissionDeniedView colors={colors} /> 
        : <ScannerMainView />;
    default:
      return <LoadingView colors={colors} />;
  }
};