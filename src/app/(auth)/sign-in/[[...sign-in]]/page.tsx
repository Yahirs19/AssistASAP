import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  /*
  Ejemplo de cómo se pueden estilizar con tailwind los componentes que provee Clerk
  */
  return (
    <SignIn
      appearance={{
        elements: {
          formButtonPrimary:
          "bg-slate-500 hover:bg-slate-400 text-sm normal-case",
        }
      }}
    />
  );
}