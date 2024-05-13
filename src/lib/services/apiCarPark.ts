import { Vehicle } from "@/types";

import supabase from "./supabase";

export const addCarUser = async ({
  license_no,
  username,
}: {
  license_no: string;
  username: string;
}) => {
  const capitalizedUsername = `${username.charAt(0).toUpperCase()}${username
    .slice(1)
    .toLowerCase()}`;
  const { data, error } = await supabase
    .from("car_number")
    .insert([
      {
        license_no: `${license_no}`.toUpperCase(),
        car_owner_name: capitalizedUsername,
        slot_occupied: null,
      },
    ])
    .select();
  if (error) throw error;
  console.log(data);
  return data;
};

export const getCarByLicense = async ({
  license_no,
}: {
  license_no: string;
}): Promise<Vehicle[]> => {
  const { data, error } = await supabase
    .from("car_number")
    .select()
    .eq("license_no", `${license_no}`.toUpperCase());
  if (error) throw error;
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
      slot_occupied: slot_no,
    })
    .eq("license_no", `${license_no}`.toUpperCase());

  await supabase
    .from("car_slot")
    .update({ occupied: true })
    .eq("slot_no", slot_no);
  if (error) throw error;
  return data;
};

export const removeCarSlot = async (license_no: string) => {
  const { data: slot_no, error } = await supabase
    .from("car_number")
    .select("slot_occupied")
    .eq("license_no", `${license_no}`.toUpperCase());

  if (error) throw error;

  await supabase
    .from("car_number")
    .update({ slot_occupied: null })
    .eq("license_no", `${license_no}`.toUpperCase());

  await supabase
    .from("car_slot")
    .update({ occupied: false })
    .eq("slot_no", slot_no[0].slot_occupied);
};
