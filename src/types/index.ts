export type Slot = {
  slot_no: number;
  created_at: string;
  occupied: boolean;
};

export type Vehicle = {
  license_no: string;
  car_owner_name: string;
  created_at: string;
  slot_occupied: Slot;
};
