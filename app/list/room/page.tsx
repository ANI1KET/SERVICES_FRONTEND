"use server";

import FormComponent from "./FormComponent";
import { Room as RoomSchema } from "@/app/lib/ui/FormReusableComponents";

export async function handleSubmit(formData: RoomSchema) {
  "use server";
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return formData;
  } catch (error) {
    throw new Error(error?.toString() || "An unknown error occurred");
  }
}

const Room = () => {
  return (
    <div className="">
      <h2 className="text-xl font-bold mb-1">List Room</h2>

      <FormComponent handleSubmit={handleSubmit} />
    </div>
  );
};

export default Room;
