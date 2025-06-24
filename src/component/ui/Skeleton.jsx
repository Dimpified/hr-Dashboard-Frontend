const Skeleton = ({
  isLoading,
  height = "h-24",
  width = "w-full",
  className = "",
}) => {
  if (!isLoading) return null;

  return (
    <div className={`space-y-4 ${className}`}>
      <div
        className={`animate-pulse bg-gray-200 rounded-md ${height} ${width}`}
      />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Skeleton;
