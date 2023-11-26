import supabase from "./supabase";

export const getCarSlots = async () => {
  const { data, error } = await supabase.from("car slot").select("*");
  if (error) throw error;
  return data;
};

export const getBikeSlots = async () => {
  const { data, error } = await supabase.from("bike slot").select("*");
  if (error) throw error;
  return data;
};

export const getAvailableCarSlots = async () => {
  const { data, error } = await supabase
    .from("car slot")
    .select("*")
    .eq("occupied", "false");
  if (error) throw error;
  return data;
};

export const getAvailableBikeSlots = async () => {
  const { data, error } = await supabase
    .from("bike slot")
    .select("*")
    .eq("occupied", "false");
  if (error) throw error;
  return data;
};
