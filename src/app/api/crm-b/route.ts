import {NextResponse} from "next/server";

const csv = `opportunity_id,amount,seller,deal_date
B1,3000,Carlos García,2024/03/01
B2,4500,Maria García,2024/03/02
B3,6200,Federico Nuñez,2024/03/03
B4,2700,Laura Romero,2024/03/04
B5,8800,Emilia Silva,2024/03/05
B6,5400,Gonzalo Medina,2024/03/06
B7,3900,Julieta Roldán,2024/03/07
B8,4700,Ramiro Vázquez,2024/03/08
B9,7300,Camila Sosa,2024/03/09
B10,5100,Matías Álvarez,2024/03/10`;

export async function GET() {
  return new NextResponse(csv, {
    headers: {"Content-Type": "text/csv"},
  });
}
