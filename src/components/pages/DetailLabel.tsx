const DetailLabel = ({ label }: { label: string }) => {
  return (
    <div className="">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      {/* <span className="label-value">{value}</span> */}
    </div>
  );
};

export default DetailLabel;
