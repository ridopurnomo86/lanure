import { LogoutButton } from "@/components/LogoutButton";
import Form from "./Form";

const MainAdmin = () => (
  <div className="min-h-screen bg-[#FDFDFD] py-12">
    <div className="max-w-4xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">
            Product Management
          </h1>
          <p className="text-slate-500 font-medium">
            Add new products to your store inventory
          </p>
        </div>
        <LogoutButton />
      </div>

      <Form />
    </div>
  </div>
);

export default MainAdmin;
