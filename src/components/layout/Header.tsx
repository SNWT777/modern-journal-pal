
import React from "react";
import { Bell, Menu, User } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  return (
    <header className="bg-white border-b border-border h-16 flex items-center justify-between px-4 sticky top-0 z-10">
      <div className="flex items-center">
        <SidebarTrigger>
          <Button variant="ghost" size="icon" className="mr-2">
            <Menu className="h-5 w-5" />
          </Button>
        </SidebarTrigger>
        <div className="flex items-center">
          <h1 className="font-bold text-xl text-edu-blue">Школьный Журнал</h1>
          <div className="ml-2 flex space-x-0.5 h-5">
            <div className="w-1.5 h-full bg-edu-russian-white"></div>
            <div className="w-1.5 h-full bg-edu-russian-blue"></div>
            <div className="w-1.5 h-full bg-edu-russian-red"></div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className="bg-edu-russian-blue text-white">ИП</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Профиль</DropdownMenuItem>
            <DropdownMenuItem>Настройки</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Выйти</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
