import PermissionRequestCard from "./PermissionRequestCard";

const ScannerRouter = ({ permissionStatus, colors }) => {
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