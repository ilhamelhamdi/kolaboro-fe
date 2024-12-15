import { BACKGROUNDS } from "../constant";

export const dynamic = 'force-dynamic';


export function GET(request: Request) {
  const randomIdx = Math.floor(Math.random() * BACKGROUNDS.length);
  return new Response(JSON.stringify(BACKGROUNDS[randomIdx]), {
    headers: { 'Content-Type': 'application/json' }
  });
}