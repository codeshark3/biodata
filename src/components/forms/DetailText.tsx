const DetailText = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex items-center justify-center  py-1 ">
      <div className="w-1/3 justify-start">
        <span className="text-sm font-medium text-zinc-500"> {label}</span>
      </div>

      <div className="w-2/3 justify-start">
        <span className="text-md font-bold text-primary"> {value}</span>
      </div>
    </div>
  );
};

export default DetailText;
