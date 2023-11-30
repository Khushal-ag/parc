import supabase from "./supabase";

export const addCarUser = async ({
  license_no,
  username,
}: {
  license_no: string;
  username: string;
}) => {
  const { data, error } = await supabase
    .from("car_number")
    .insert([
      {
        license_no: `${license_no}`.toUpperCase(),
        car_owner_name: `${username}`,
        slot_occupied: null,
      },
    ])
    .select();
  if (error) throw error;
  console.log(data);
  return data;
};

export const getCarByLicense = async (license_no: string) => {
  const { data, error } = await supabase
    .from("car_number")
    .select()
    .eq("license_no", `${license_no}`.toUpperCase());
  if (error) throw error;
  console.log(data);
  return data;
};

export const bookCarSlot = async ({
  license_no,
  slot_no,
}: {
  license_no: string;
  slot_no: number;
}) => {
  const { data, error } = await supabase
    .from("car_number")
    .update({
      slot_occupied: {
        slot_no: slot_no,
        occupied: true,
      },
    })
    .eq("license_no", `${license_no}`.toUpperCase());
  if (error) throw error;
  console.log(data);
  return data;
};

export const removeCarSlot = async (license_no: string) => {
  const { data: slot_no, error } = await supabase
    .from("car_number")
    .select("slot_occupied.slot_no")
    .eq("license_no", `${license_no}`.toUpperCase());

  if (error) throw error;

  await supabase
    .from("car_slot")
    .update({ occupied: false })
    .eq("slot_no", slot_no);
};
