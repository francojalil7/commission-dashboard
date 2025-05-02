import {NextResponse} from "next/server";

export async function GET() {
  const data = [
    {deal_id: "A1", total: 5000, rep_name: "Ana Pérez", sold_at: "2024-03-01"},
    {deal_id: "A2", amount: 4500, rep_name: "Juan Gómez", created_on: "2024-03-02"},
    {deal_id: "A3", total: 8000, rep_name: "Lucas Morales", sold_at: "2024-03-03"},
    {deal_id: "A4", amount: 3200, rep_name: "Mariana Díaz", created_on: "2024-03-04"},
    {deal_id: "A5", total: 6100, rep_name: "Sofía Ríos", sold_at: "2024-03-05"},
    {deal_id: "A6", amount: 7200, rep_name: "Pedro Salas", created_on: "2024-03-06"},
    {deal_id: "A7", total: 9100, rep_name: "Lucía Benítez", sold_at: "2024-03-07"},
    {deal_id: "A8", amount: 3400, rep_name: "Diego Paredes", created_on: "2024-03-08"},
    {deal_id: "A9", total: 2500, rep_name: "Martina Gutiérrez", sold_at: "2024-03-09"},
    {deal_id: "A10", amount: 4600, rep_name: "Nicolás Torres", created_on: "2024-03-10"},
    {deal_id: "A11", total: 5800, rep_name: "Valentina Castro", sold_at: "2024-03-11"},
    {deal_id: "A12", amount: 3900, rep_name: "Emilio Vargas", created_on: "2024-03-12"},
  ];

  return NextResponse.json(data);
}
