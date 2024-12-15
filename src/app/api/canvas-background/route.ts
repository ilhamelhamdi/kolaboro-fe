export const dynamic = 'force-dynamic'; // static by default, unless reading the request
import { BACKGROUNDS } from "./constant";

export function GET(request: Request) {
  return new Response(JSON.stringify(BACKGROUNDS), {
    headers: { 'Content-Type': 'application/json' }
  });
}