//app/(private)/medicine/page.tsx

import { redirect } from "next/navigation";
export default function MedicineRedirect() {
  redirect("/shop");
}
