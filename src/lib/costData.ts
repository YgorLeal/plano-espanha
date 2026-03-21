/**
 * CUSTO DE VIDA NA ESPANHA — Dados por cidade, perfil e categoria (EUR/mês)
 *
 * Última atualização: Março 2026
 *
 * Fontes consultadas:
 *   - Numbeo (numbeo.com/cost-of-living) — Mar 2026
 *   - Expatistan (expatistan.com/cost-of-living) — Mar 2026
 *   - Housing Anywhere (housinganywhere.com) — Mar 2026
 *   - INE (ine.es) — dados complementares
 *
 * Metodologia:
 *   - Valores representam a MÉDIA entre as fontes consultadas
 *   - Arredondados para múltiplos de €5
 *   - Perfil "solo" = 1 adulto, apartamento de 1 quarto
 *   - Perfil "couple" = 2 adultos, apartamento de 1-2 quartos
 *   - Perfil "family" = 2 adultos + 1 filho, apartamento de 2-3 quartos
 *   - Aluguel considera zona semi-central (nem centro histórico, nem periferia)
 *
 * Categorias:
 *   rent       — Aluguel mensal do apartamento
 *   utilities  — Luz, água, gás, aquecimento, internet (apt ~85m²)
 *   groceries  — Supermercado e compras domésticas
 *   transport  — Passe mensal de transporte público
 *   health     — Seguro de saúde privado (obrigatório para maioria dos vistos)
 *   leisure    — Lazer: cinema, academia, passeios, hobbies
 *   dining     — Comer fora: menú del día, restaurantes, cafés
 *
 * Como atualizar:
 *   1. Consulte Numbeo e Expatistan para a cidade desejada
 *   2. Calcule a média entre as fontes
 *   3. Arredonde para o múltiplo de €5 mais próximo
 *   4. Atualize a data de "Última atualização" acima
 */

export type CityKey = "madrid" | "barcelona" | "valencia" | "sevilla" | "granada" | "malaga" | "bilbao";
export type ProfileKey = "solo" | "couple" | "family";
export type HousingKey = "apartment" | "room";

export interface CostBreakdown {
  rent: number;
  utilities: number;
  groceries: number;
  transport: number;
  health: number;
  leisure: number;
  dining: number;
}

export const costCategories = ["rent", "utilities", "groceries", "transport", "health", "leisure", "dining"] as const;
export type CostCategory = typeof costCategories[number];

type CostData = Record<CityKey, Record<ProfileKey, CostBreakdown>>;

export const costData: CostData = {
  madrid: {
    solo:   { rent: 1200, utilities: 135, groceries: 250, transport: 55,  health: 80,  leisure: 150, dining: 200 },
    couple: { rent: 1500, utilities: 160, groceries: 450, transport: 110, health: 140, leisure: 250, dining: 350 },
    family: { rent: 1800, utilities: 200, groceries: 650, transport: 110, health: 220, leisure: 200, dining: 300 },
  },
  barcelona: {
    solo:   { rent: 1250, utilities: 130, groceries: 250, transport: 45,  health: 80,  leisure: 160, dining: 200 },
    couple: { rent: 1550, utilities: 155, groceries: 460, transport: 90,  health: 140, leisure: 260, dining: 350 },
    family: { rent: 1900, utilities: 190, groceries: 680, transport: 90,  health: 220, leisure: 210, dining: 300 },
  },
  valencia: {
    solo:   { rent: 850,  utilities: 120, groceries: 200, transport: 40,  health: 70,  leisure: 120, dining: 160 },
    couple: { rent: 1100, utilities: 140, groceries: 350, transport: 80,  health: 120, leisure: 200, dining: 280 },
    family: { rent: 1500, utilities: 175, groceries: 530, transport: 80,  health: 190, leisure: 170, dining: 240 },
  },
  sevilla: {
    solo:   { rent: 800,  utilities: 115, groceries: 200, transport: 40,  health: 65,  leisure: 110, dining: 150 },
    couple: { rent: 1050, utilities: 135, groceries: 350, transport: 80,  health: 110, leisure: 180, dining: 260 },
    family: { rent: 1400, utilities: 170, groceries: 520, transport: 80,  health: 180, leisure: 150, dining: 220 },
  },
  granada: {
    solo:   { rent: 600,  utilities: 105, groceries: 180, transport: 35,  health: 60,  leisure: 100, dining: 130 },
    couple: { rent: 800,  utilities: 125, groceries: 320, transport: 70,  health: 100, leisure: 170, dining: 230 },
    family: { rent: 1100, utilities: 155, groceries: 480, transport: 70,  health: 170, leisure: 140, dining: 200 },
  },
  malaga: {
    solo:   { rent: 950,  utilities: 120, groceries: 210, transport: 40,  health: 70,  leisure: 130, dining: 170 },
    couple: { rent: 1200, utilities: 145, groceries: 380, transport: 80,  health: 120, leisure: 210, dining: 290 },
    family: { rent: 1550, utilities: 180, groceries: 550, transport: 80,  health: 190, leisure: 170, dining: 250 },
  },
  bilbao: {
    solo:   { rent: 850,  utilities: 130, groceries: 230, transport: 45,  health: 75,  leisure: 130, dining: 170 },
    couple: { rent: 1100, utilities: 155, groceries: 400, transport: 90,  health: 130, leisure: 210, dining: 290 },
    family: { rent: 1450, utilities: 190, groceries: 570, transport: 90,  health: 200, leisure: 170, dining: 250 },
  },
};

/**
 * Dados de aluguel de quarto em piso compartilhado (solo e casal).
 * Inclui aluguel do quarto + utilidades rateadas entre moradores.
 * Fontes: Idealista, HousingAnywhere, Numbeo (Mar 2026)
 *
 * Notas:
 *   - Solo = quarto individual em piso com 2-3 pessoas
 *   - Casal = quarto duplo (geralmente o maior do piso)
 *   - Utilidades geralmente incluídas ou rateadas (~€50-70/pessoa)
 */
type RoomOverride = { rent: number; utilities: number };
export const roomRentData: Record<CityKey, Record<"solo" | "couple", RoomOverride>> = {
  madrid:    { solo: { rent: 550, utilities: 60 }, couple: { rent: 700, utilities: 70 } },
  barcelona: { solo: { rent: 600, utilities: 55 }, couple: { rent: 750, utilities: 65 } },
  valencia:  { solo: { rent: 400, utilities: 50 }, couple: { rent: 500, utilities: 55 } },
  sevilla:   { solo: { rent: 380, utilities: 45 }, couple: { rent: 480, utilities: 55 } },
  granada:   { solo: { rent: 300, utilities: 40 }, couple: { rent: 380, utilities: 50 } },
  malaga:    { solo: { rent: 450, utilities: 50 }, couple: { rent: 560, utilities: 60 } },
  bilbao:    { solo: { rent: 420, utilities: 55 }, couple: { rent: 530, utilities: 65 } },
};

export function getCosts(city: CityKey, profile: ProfileKey, housing: HousingKey = "apartment"): CostBreakdown & { total: number } {
  const data = { ...costData[city][profile] };

  if (housing === "room" && profile !== "family") {
    const override = roomRentData[city][profile as "solo" | "couple"];
    data.rent = override.rent;
    data.utilities = override.utilities;
  }

  const total = data.rent + data.utilities + data.groceries + data.transport + data.health + data.leisure + data.dining;
  return { ...data, total };
}
