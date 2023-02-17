import { useState } from "react";
import LogInForm from "./LogInForm";
import RegisterForm from "./RegisterForm";

export default function SignInPage() {
  const [hasAccount, setSetAccount] = useState(true);

  return (
  <>
  {hasAccount 
  ? <LogInForm setSetAccount={setSetAccount}/> 
  : <RegisterForm setSetAccount={setSetAccount}/>
  }
  </>
  );
}
