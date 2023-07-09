import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./menu";
import Single from "./single";

export function Router() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/single" element={<Single />} />
         </Routes>
      </BrowserRouter>
   );
}
