import FileUpload from "@/components/global/file-upload";
import { Loader } from "@/components/global/loader";
import StatusBar from "@/components/global/status-bar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useWorkplace, useWorkplaceStore } from "@/hooks/workplace";
import React from "react";

type Props = {};

const Step2 = (props: Props) => {
  const { currentStep, setCurrentStep } = useWorkplaceStore();
  const { steptwoForm, onSubmitStepTwo ,loading} = useWorkplace();
  return (
    <div>
      <Form {...steptwoForm}>
        <form onSubmit={onSubmitStepTwo}>
          <FormField
            control={steptwoForm.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex text-muted-foreground">
                  Select an Image
                </FormLabel>
                <FormControl>
                  <FileUpload
                    endpoints="workPlaceImage"
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormDescription className="text-sm">
                  Upload an image of your workplace | Max 4MB | JPG, PNG | you
                  can change it later
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        <Loader loading={loading}>
        <Button type="submit" className="w-full bg-primary-dark text-white text-semibold hover:bg-primary-dark mt-4">Submit</Button>
        </Loader>
        </form>
      </Form>

      <StatusBar currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </div>
  );
};

export default Step2;
