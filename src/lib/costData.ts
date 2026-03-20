// Cost of living data (EUR/month) - Sources: Numbeo, INE, Expatistan (2026)
// Each city has costs for: solo, couple, family

export type CityKey = "madrid" | "barcelona" | "valencia" | "sevilla" | "granada" | "malaga" | "bilbao";
export type ProfileKey = "solo" | "couple" | "family";

interface CostBreakdown {
  rent: number;
  groceries: number;
  transport: number;
  health: number;
  leisure: number;
}

type CostData = Record<CityKey, Record<ProfileKey, CostBreakdown>>;

export const costData: CostData = {
  madrid: {
    solo:   { rent: 950,  groceries: 300, transport: 55,  health: 80,  leisure: 250 },
    couple: { rent: 1200, groceries: 480, transport: 110, health: 140, leisure: 400 },
    family: { rent: 1500, groceries: 650, transport: 110, health: 220, leisure: 350 },
  },
  barcelona: {
    solo:   { rent: 1000, groceries: 310, transport: 40,  health: 80,  leisure: 260 },
    couple: { rent: 1300, groceries: 500, transport: 80,  health: 140, leisure: 420 },
    family: { rent: 1600, groceries: 680, transport: 80,  health: 220, leisure: 380 },
  },
  valencia: {
    solo:   { rent: 750,  groceries: 260, transport: 40,  health: 70,  leisure: 200 },
    couple: { rent: 950,  groceries: 420, transport: 80,  health: 120, leisure: 320 },
    family: { rent: 1200, groceries: 580, transport: 80,  health: 190, leisure: 280 },
  },
  sevilla: {
    solo:   { rent: 700,  groceries: 250, transport: 40,  health: 65,  leisure: 180 },
    couple: { rent: 900,  groceries: 400, transport: 80,  health: 110, leisure: 300 },
    family: { rent: 1100, groceries: 550, transport: 80,  health: 180, leisure: 260 },
  },
  granada: {
    solo:   { rent: 600,  groceries: 240, transport: 35,  health: 60,  leisure: 160 },
    couple: { rent: 800,  groceries: 380, transport: 70,  health: 100, leisure: 260 },
    family: { rent: 1000, groceries: 520, transport: 70,  health: 170, leisure: 230 },
  },
  malaga: {
    solo:   { rent: 750,  groceries: 260, transport: 40,  health: 70,  leisure: 200 },
    couple: { rent: 950,  groceries: 420, transport: 80,  health: 120, leisure: 320 },
    family: { rent: 1200, groceries: 570, transport: 80,  health: 190, leisure: 280 },
  },
  bilbao: {
    solo:   { rent: 700,  groceries: 280, transport: 45,  health: 75,  leisure: 190 },
    couple: { rent: 950,  groceries: 450, transport: 90,  health: 130, leisure: 310 },
    family: { rent: 1200, groceries: 600, transport: 90,  health: 200, leisure: 270 },
  },
};

export function getCosts(city: CityKey, profile: ProfileKey): CostBreakdown & { total: number } {
  const data = costData[city][profile];
  const total = data.rent + data.groceries + data.transport + data.health + data.leisure;
  return { ...data, total };
}
