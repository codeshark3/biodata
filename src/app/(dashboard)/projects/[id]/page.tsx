import ProjectDetails from "~/components/ProjectDetails";
import { useParams } from "next/navigation";
import { getProject } from "~/server/projects_queries";
import { Button } from "~/components/ui/button";

import { TitleContainer } from "~/components/TitleContainer";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "~/components/ui/form";
import DetailLabel from "~/components/forms/DetailLabel";
import { FormCardWrapper } from "~/components/forms/FormCardWrapper";
import DetailText from "~/components/forms/DetailText";

interface Props {
  params: {
    id: number;
  };
}

interface Project {
  title?: string;
  principal_investigator: string;
  date_of_registration: string;
  institution: string;
  department: string;
  contact_no: number;
  email: string;
  name_irb: string;
  irb_approval_no: string;
  approval_date: string;
  expiry_date: string;
  consent_forms: boolean;
  consent_for_storage: boolean;
  urine: boolean;
  stool: boolean;
  whole_blood: boolean;
  serum: boolean;
  plasma: boolean;
  skin_snip: boolean;
  dna: boolean;
  rna: boolean;

  others: string;
  storage_requirements: string;
  number_of_samples: string;
  start_date: string;
  end_date: string;
  user_id: string;
}

const ProjectDetailsPage = async ({ params: { id } }: Props) => {
  const idAsNumber = Number(id);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const project = await getProject(idAsNumber);
  const {
    title,
    principal_investigator,
    date_of_registration,
    institution,
    department,
    contact_no,
    email,
    name_irb,
    irb_approval_no,
    approval_date,
    expiry_date,
    consent_forms,
    consent_for_storage,
    urine,
    stool,
    whole_blood,
    serum,
    plasma,
    skin_snip,
    dna,
    rna,

    others,
    storage_requirements,
    number_of_samples,
    start_date,
    end_date,
    user_id,
  } = project;

  return (
    <div className="h-full w-full   ">
      <div>
        <div className="flex items-center justify-between  px-4">
          <TitleContainer title="Project" subtitle={project.title as string} />
          {/* <Button className="btn-primary h-10 w-40">
            <Link href="/admin/users/new">Add New User</Link>
          </Button> */}
        </div>
      </div>
      <FormCardWrapper headerLabel="Section A: Project Information">
        <div className="space-y-1 ">
          <DetailText label="Title" value={title as string} />
          <DetailText
            label="Principal Investigator"
            value={principal_investigator as string}
          />
          <DetailText
            label="Date Of Registration"
            value={date_of_registration as string}
          />
          <DetailText label="Instituition" value={institution as string} />
          <DetailText label="Department" value={department as string} />
          <DetailText label="Contact Number" value={contact_no as string} />
          <DetailText label="Email" value={email as string} />
          <DetailText label="Name Of IRB" value={name_irb as string} />
          <DetailText
            label="IRB Approval No."
            value={irb_approval_no as string}
          />
          <DetailText label="Approval Date" value={approval_date as string} />
          <DetailText label="Expiry Date" value={expiry_date as string} />
          <DetailText
            label="Consent Forms?"
            value={consent_forms ? "Yes" : "No"}
          />
          <DetailText
            label="Consent For Storage?"
            value={consent_for_storage ? "Yes" : "No"}
          />
          <DetailText label="Urine?" value={urine ? "Yes" : "No"} />
          <DetailText label="Stool?" value={stool ? "Yes" : "No"} />
          <DetailText label="Whole Blood?" value={whole_blood ? "Yes" : "No"} />
          <DetailText label="Serum?" value={serum ? "Yes" : "No"} />
          <DetailText label="Plasma?" value={plasma ? "Yes" : "No"} />
          <DetailText label="Skin Snip?" value={skin_snip ? "Yes" : "No"} />
          <DetailText label="DNA?" value={dna ? "Yes" : "No"} />
          <DetailText label="RNA?" value={rna ? "Yes" : "No"} />
          <DetailText label="Others" value={others as string} />
          <DetailText label="Entered By" value={user_id as string} />
          <DetailText label="Start Date" value={start_date as string} />
          <DetailText label="End Date" value={end_date as string} />
          <DetailText
            label="Storage Requirements"
            value={storage_requirements as string}
          />
          <DetailText
            label="Number Of Samples"
            value={String(number_of_samples as number)}
          />
        </div>
        <div className=" flex  items-center justify-center  ">
          {/* <div className=" flex  items-center justify-center ">
                <FormFieldComponent
                  control={form.control}
                  name="institution"
                  label="Institution"
                  placeholder="Institution"
                  type="text"
                  isPending={false} // Pass the actual isPending state
                />
                <FormFieldComponent
                  control={form.control}
                  name="department" // Pass the actual name of the fieldpartment
                  label="Department"
                  placeholder="Department"
                  type="text"
                  isPending={false} // Pass the actual isPending state
                />
              </div>
              <div className=" flex  items-center justify-center ">
                <FormFieldComponent
                  control={form.control}
                  name="contact_no" // Pass the actual name of the fieldcontact_no
                  label="Contact Number"
                  placeholder="Contact Number"
                  type="text"
                  isPending={false} // Pass the actual isPending state
                />
                <FormFieldComponent
                  control={form.control}
                  name="email" // Pasxxs the actual name of the fieldemail
                  label="Email"
                  placeholder="Email"
                  type="text"
                  isPending={false} // Pass the actual isPending state
                />
              </div> */}
        </div>
      </FormCardWrapper>
      <FormCardWrapper headerLabel="Section B: Ethical Approval">
        <div className="space-y-4">
          {/* <div className=" flex  items-center justify-center  ">
                <FormFieldComponent
                  control={form.control}
                  name="name_irb"
                  label="Name of IRB"
                  placeholder="Name of IRB"
                  type="text"
                  isPending={false} // Pass the actual isPending state
                />
                <FormFieldComponent
                  control={form.control}
                  name="irb_approval_no"
                  label="IRB Aproval Number"
                  placeholder="IRB Aproval Number"
                  type="text"
                  isPending={false} // Pass the actual isPending state
                />
              </div>
              <div className=" flex  items-center justify-center ">
                <FormFieldComponent
                  control={form.control}
                  name="approval_date"
                  label="Approval Date"
                  placeholder="Approval Date"
                  type="date"
                  isPending={false} // Pass the actual isPending state
                />
                <FormFieldComponent
                  control={form.control}
                  name="expiry_date" // Pass the actual name of the fieldpartment
                  label="Expiry Date"
                  placeholder="Expiry Date"
                  type="date"
                  isPending={false} // Pass the actual isPending state
                />
              </div> */}

          <div className=" flex  items-center justify-between  ">
            {/* <div className=" flex w-1/2   px-2 py-1">
                  <FormCheckboxComponent
                    control={form.control}
                    name="consent_forms"
                    isPending={false} // Pass the actual isPending state
                    label="Consent Forms Attached?"
                  />
                </div>
                <div className=" flex w-1/2 px-2 py-1">
                  <FormCheckboxComponent
                    control={form.control}
                    name="consent_for_storage"
                    isPending={false} // Pass the actual isPending state
                    label="Consent Covers Storage For Future Use?"
                  />
                </div> */}
          </div>
        </div>
      </FormCardWrapper>
      <FormCardWrapper headerLabel="Section C: Project Timeline and Specimen Information">
        <div className=" flex  border-4 border-primary ">
          {/* <FormFieldComponent
                control={form.control}
                name="title"
                label="Title"
                placeholder="Project Title"
                type="text"
                isPending={false} // Pass the actual isPending state
              /> */}
          <div className=" flex  w-1/3  flex-col items-center justify-center  border-r-4 border-primary  ">
            {/* <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem className="w-[90%]">
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem className="w-[90%]">
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
          </div>

          <div className="flex w-1/3 flex-col items-center justify-center border-r-4 border-primary py-4">
            <p className="pb-2  font-semibold">Specimens Types Required</p>
            <div className="flex w-full  justify-center px-2  ">
              <div className="flex  w-1/2  flex-col space-y-4 ">
                {/* <FormCheckboxComponent
                      control={form.control}
                      name="urine"
                      isPending={false}
                      label="Urine"
                    />
                    <FormCheckboxComponent
                      control={form.control}
                      name="whole_blood"
                      isPending={false}
                      label="Whole Blood"
                    />
                    <FormCheckboxComponent
                      control={form.control}
                      name="plasma"
                      isPending={false}
                      label="Plasma"
                    />
                    <FormCheckboxComponent
                      control={form.control}
                      name="dna"
                      isPending={false}
                      label="DNA"
                    /> */}
              </div>
              {/* <div className="flex  w-1/2 flex-col space-y-4 ">
                    <FormCheckboxComponent
                      control={form.control}
                      name="stool"
                      isPending={false}
                      label="Stool"
                    />
                    <FormCheckboxComponent
                      control={form.control}
                      name="serum"
                      isPending={false}
                      label="Serum"
                    />
                    <FormCheckboxComponent
                      control={form.control}
                      name="skin_snip"
                      isPending={false}
                      label="Skin Snip"
                    />
                    <FormCheckboxComponent
                      control={form.control}
                      name="rna"
                      isPending={false}
                      label="RNA"
                    />
                  </div> */}
            </div>
          </div>
          <div className="flex w-1/3 flex-col  items-start border-2   px-2 pt-2">
            {/* <FormField
                  control={form.control}
                  name="storage_requirements"
                  render={({ field }) => (
                    <FormItem className="w-[90%]">
                      <FormLabel>Storage Requirement</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Storage Requirement"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormFieldComponent
                  control={form.control}
                  name="number_of_samples"
                  label="Number of Samples"
                  placeholder="Number of Samples"
                  type="number"
                  isPending={false}
                />*/}
          </div>
        </div>
      </FormCardWrapper>
    </div>
  );
};

export default ProjectDetailsPage;
