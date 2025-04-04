
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "@/hooks/use-theme";
import { Check, Moon, Sun, Laptop, Palette, RefreshCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const Settings = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState("medium");
  const [colorScheme, setColorScheme] = useState("blue");

  const saveSettings = () => {
    toast({
      title: "Настройки сохранены",
      description: "Ваши настройки были успешно сохранены.",
    });
  };

  // Доступные цветовые схемы
  const colorSchemes = [
    { name: "Синяя", value: "blue", primaryColor: "bg-blue-500", accentColor: "bg-blue-300" },
    { name: "Зеленая", value: "green", primaryColor: "bg-green-500", accentColor: "bg-green-300" },
    { name: "Фиолетовая", value: "purple", primaryColor: "bg-purple-500", accentColor: "bg-purple-300" },
    { name: "Красная", value: "red", primaryColor: "bg-red-500", accentColor: "bg-red-300" },
    { name: "Оранжевая", value: "orange", primaryColor: "bg-orange-500", accentColor: "bg-orange-300" },
    { name: "Бирюзовая", value: "teal", primaryColor: "bg-teal-500", accentColor: "bg-teal-300" },
    { name: "Индиго", value: "indigo", primaryColor: "bg-indigo-500", accentColor: "bg-indigo-300" }
  ];

  return (
    <div className="container p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Настройки</h1>

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="appearance">Внешний вид</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Профиль пользователя</CardTitle>
              <CardDescription>
                Измените ваши личные данные и контактную информацию.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Имя</Label>
                  <Input id="firstName" placeholder="Иван" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input id="lastName" placeholder="Иванов" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="ivan@example.ru" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Роль</Label>
                <Select defaultValue="student">
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите роль" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Ученик</SelectItem>
                    <SelectItem value="teacher">Учитель</SelectItem>
                    <SelectItem value="admin">Администратор</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>Сохранить изменения</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Внешний вид</CardTitle>
              <CardDescription>
                Настройте внешний вид приложения.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Выбор темы */}
              <div className="space-y-4">
                <Label className="text-base">Тема оформления</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card 
                    className={cn("cursor-pointer transition-all", 
                      theme === "light" ? "border-primary ring-2 ring-primary" : "hover:border-primary/50")}
                    onClick={() => setTheme("light")}
                  >
                    <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
                      <Sun className="h-8 w-8 text-yellow-500" />
                      <span>Светлая</span>
                      {theme === "light" && (
                        <Badge className="absolute top-2 right-2 bg-primary">
                          <Check className="h-3 w-3 mr-1" />
                          Выбрана
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className={cn("cursor-pointer transition-all", 
                      theme === "dark" ? "border-primary ring-2 ring-primary" : "hover:border-primary/50")}
                    onClick={() => setTheme("dark")}
                  >
                    <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
                      <Moon className="h-8 w-8 text-blue-500" />
                      <span>Темная</span>
                      {theme === "dark" && (
                        <Badge className="absolute top-2 right-2 bg-primary">
                          <Check className="h-3 w-3 mr-1" />
                          Выбрана
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className={cn("cursor-pointer transition-all", 
                      theme === "system" ? "border-primary ring-2 ring-primary" : "hover:border-primary/50")}
                    onClick={() => setTheme("system")}
                  >
                    <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
                      <Laptop className="h-8 w-8 text-gray-500" />
                      <span>Системная</span>
                      {theme === "system" && (
                        <Badge className="absolute top-2 right-2 bg-primary">
                          <Check className="h-3 w-3 mr-1" />
                          Выбрана
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Выбор размера шрифта */}
              <div className="space-y-2">
                <Label htmlFor="fontSize">Размер шрифта</Label>
                <Select value={fontSize} onValueChange={setFontSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите размер шрифта" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Маленький</SelectItem>
                    <SelectItem value="medium">Средний</SelectItem>
                    <SelectItem value="large">Большой</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Выбор цветовой схемы */}
              <div className="space-y-4">
                <Label className="text-base">Цветовая схема</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {colorSchemes.map((scheme) => (
                    <Card 
                      key={scheme.value}
                      className={cn("cursor-pointer transition-all border-2", 
                        colorScheme === scheme.value ? "border-primary ring-2 ring-primary" : "hover:border-primary/50")}
                      onClick={() => setColorScheme(scheme.value)}
                    >
                      <CardContent className="p-3 flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className={`w-4 h-4 rounded ${scheme.primaryColor}`}></div>
                          <div className={`w-4 h-4 rounded ${scheme.accentColor}`}></div>
                        </div>
                        <span className="text-sm">{scheme.name}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Сброс настроек */}
              <div className="pt-2">
                <Button variant="outline" className="w-full" onClick={() => {
                  setTheme("system");
                  setFontSize("medium");
                  setColorScheme("blue");
                  toast({
                    title: "Настройки сброшены",
                    description: "Все настройки внешнего вида возвращены к значениям по умолчанию.",
                  });
                }}>
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Сбросить все настройки
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings} className="mr-2">Сохранить изменения</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Уведомления</CardTitle>
              <CardDescription>
                Управляйте вашими уведомлениями.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Новые оценки</p>
                  <p className="text-sm text-muted-foreground">
                    Получать уведомления о новых оценках.
                  </p>
                </div>
                <Switch id="grades" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Новые задания</p>
                  <p className="text-sm text-muted-foreground">
                    Получать уведомления о новых заданиях.
                  </p>
                </div>
                <Switch id="assignments" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Напоминания</p>
                  <p className="text-sm text-muted-foreground">
                    Получать напоминания о предстоящих заданиях.
                  </p>
                </div>
                <Switch id="reminders" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email уведомления</p>
                  <p className="text-sm text-muted-foreground">
                    Получать важные уведомления по email.
                  </p>
                </div>
                <Switch id="email-notifications" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Звуковые уведомления</p>
                  <p className="text-sm text-muted-foreground">
                    Включить звуки для важных уведомлений.
                  </p>
                </div>
                <Switch id="sound-notifications" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>Сохранить изменения</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
