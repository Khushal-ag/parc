import supabase from "./supabase";

export const getCarSlots = async () => {
  const { data, error } = await supabase.from("car_slot").select("*");
  if (error) throw error;
  return data;
};

export const getBikeSlots = async () => {
  const { data, error } = await supabase.from("bike_slot").select("*");
  if (error) throw error;
  return data;
};

export const getAvailableCarSlots = async () => {
  const { data, error } = await supabase
    .from("car_slot")
    .select("*")
    .eq("occupied", "false");
  if (error) throw error;
  data.sort((a, b) => a.slot_no - b.slot_no);
  return data;
};

export const getAvailableBikeSlots = async () => {
  const { data, error } = await supabase
    .from("bike_slot")
    .select("*")
    .eq("occupied", "false");
  if (error) throw error;
  return data;
};

export const addCarSlot = async (slot: number) => {
  const { data, error } = await supabase
    .from("car_slot")
    .insert([{ slot_no: `${slot}`, occupied: "false" }])
    .select();
  if (error) throw error;
  console.log(data);
  return data;
};

export const addBikeSlot = async (slot: number) => {
  const { data, error } = await supabase
    .from("bike_slot")
    .insert([{ slot_no: `${slot}`, occupied: "false" }])
    .select();
  if (error) throw error;
  console.log(data);
  return data;
};

export const deleteCarSlot = async (slot: number) => {
  const { data, error } = await supabase
    .from("car_slot")
    .delete()
    .eq("slot_no", `${slot}`)
    .eq("occupied", "false");
  if (error) throw error;
  return data;
};

export const deleteBikeSlot = async (slot: number) => {
  const { data, error } = await supabase
    .from("bike_slot")
    .delete()
    .eq("slot_no", `${slot}`)
    .eq("occupied", "false");
  if (error) throw error;
  return data;
};
