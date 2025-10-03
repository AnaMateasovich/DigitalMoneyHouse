"use client";

import { useEffect } from "react";
import { AuthService } from "../services/auth.service";
import { AccountService } from "../services/account.service";


export default function TestPage() {
  useEffect(() => {
    async function checkLogin() {
      const res = await AuthService.login({
        email: "testAna@mail.com",
        password: "123456",
      });
      console.log("Respuesta login:", res);
      const token = res
        const acc = AccountService.getProfile(token)
      console.log("Profile data ", acc)
    }
    checkLogin();
  }, []);

  return (
    <div>
      <h1>Test Login</h1>
      <p>Revisá la consola del navegador 👀</p>
    </div>
  );
}
