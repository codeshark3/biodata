interface TitleContainerProps {
  title: string;
  subtitle: string;
}

export const TitleContainer = ({ title, subtitle }: TitleContainerProps) => {
  return (
    <div className="items-center ">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
    </div>
    // <div className="items-center pl-2 ">
    //   <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
    //     {title}
    //   </h1>
    //   <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
    // </div>
  );
};
