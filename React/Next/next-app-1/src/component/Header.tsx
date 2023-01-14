import { delay } from "@/app/lib/delay";

export default async function Header() {
  await delay(5000);
  return <div>header</div>;
}
