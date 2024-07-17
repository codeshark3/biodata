import { getSample } from "~/server/samples";
interface Props {
  params: {
    id: string;
  };
}
interface Sample {
  id: string;
  // project_id: string;
  sample_id: string;
  sample_type: string;
  gender: string;
  location: string;
}
const SampleDetails = async ({ params: { id } }: Props) => {
  const idAsNumber = Number(id);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const sample = await getSample(idAsNumber);

  const { sample_id, sample_type, location, gender } = sample;
  return <div className="h-full w-full"></div>;
};

export default SampleDetails;
