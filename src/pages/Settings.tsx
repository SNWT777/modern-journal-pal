
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useTheme } from "@/hooks/use-theme";
import { Check, Moon, Sun, Laptop, Palette, RefreshCcw, Type } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const Settings = () => {
  const { theme, setTheme, colorScheme, setColorScheme, fontSize, setFontSize } = useTheme();

  const saveSettings = () => {
    toast("Настройки сохранены", {
      description: "Ваши настройки были успешно сохранены.",
    });
  };

  // Available color schemes
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
              <CardTitle className="flex items-center">
                <Palette className="mr-2 h-5 w-5 text-primary" />
                Внешний вид
              </CardTitle>
              <CardDescription>
                Настройте внешний вид приложения по вашему вкусу.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Theme selection */}
              <div className="space-y-4">
                <Label className="text-base font-medium flex items-center">
                  <Sun className="mr-2 h-5 w-5 text-yellow-500" />
                  Тема оформления
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card 
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md duration-300",
                      theme === "light" ? "ring-2 ring-primary border-primary" : "hover:border-primary/50"
                    )}
                    onClick={() => setTheme("light")}
                  >
                    <CardContent className="p-4 flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-white to-slate-100 rounded-full flex items-center justify-center shadow-sm">
                        <Sun className="h-6 w-6 text-yellow-500" />
                      </div>
                      <span className="font-medium">Светлая</span>
                      {theme === "light" && (
                        <Badge className="bg-primary text-primary-foreground">
                          <Check className="h-3 w-3 mr-1" />
                          Выбрана
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md duration-300",
                      theme === "dark" ? "ring-2 ring-primary border-primary" : "hover:border-primary/50"
                    )}
                    onClick={() => setTheme("dark")}
                  >
                    <CardContent className="p-4 flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center shadow-sm">
                        <Moon className="h-6 w-6 text-blue-400" />
                      </div>
                      <span className="font-medium">Темная</span>
                      {theme === "dark" && (
                        <Badge className="bg-primary text-primary-foreground">
                          <Check className="h-3 w-3 mr-1" />
                          Выбрана
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md duration-300",
                      theme === "system" ? "ring-2 ring-primary border-primary" : "hover:border-primary/50"
                    )}
                    onClick={() => setTheme("system")}
                  >
                    <CardContent className="p-4 flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center shadow-sm">
                        <Laptop className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                      </div>
                      <span className="font-medium">Системная</span>
                      {theme === "system" && (
                        <Badge className="bg-primary text-primary-foreground">
                          <Check className="h-3 w-3 mr-1" />
                          Выбрана
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Font size selection */}
              <div className="space-y-4">
                <Label className="text-base font-medium flex items-center">
                  <Type className="mr-2 h-5 w-5 text-primary" />
                  Размер шрифта
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card 
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md duration-300",
                      fontSize === "small" ? "ring-2 ring-primary border-primary" : "hover:border-primary/50"
                    )}
                    onClick={() => setFontSize("small")}
                  >
                    <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
                      <span className="text-sm">Aa</span>
                      <span>Маленький</span>
                      {fontSize === "small" && (
                        <Badge className="bg-primary text-primary-foreground">
                          <Check className="h-3 w-3 mr-1" />
                          Выбран
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md duration-300",
                      fontSize === "medium" ? "ring-2 ring-primary border-primary" : "hover:border-primary/50"
                    )}
                    onClick={() => setFontSize("medium")}
                  >
                    <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
                      <span className="text-base">Aa</span>
                      <span>Средний</span>
                      {fontSize === "medium" && (
                        <Badge className="bg-primary text-primary-foreground">
                          <Check className="h-3 w-3 mr-1" />
                          Выбран
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md duration-300",
                      fontSize === "large" ? "ring-2 ring-primary border-primary" : "hover:border-primary/50"
                    )}
                    onClick={() => setFontSize("large")}
                  >
                    <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
                      <span className="text-lg">Aa</span>
                      <span>Большой</span>
                      {fontSize === "large" && (
                        <Badge className="bg-primary text-primary-foreground">
                          <Check className="h-3 w-3 mr-1" />
                          Выбран
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Color scheme selection */}
              <div className="space-y-4">
                <Label className="text-base font-medium flex items-center">
                  <Palette className="mr-2 h-5 w-5 text-primary" />
                  Цветовая схема
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {colorSchemes.map((scheme) => (
                    <Card 
                      key={scheme.value}
                      className={cn(
                        "cursor-pointer transition-all hover:shadow-md border-2",
                        colorScheme === scheme.value ? "ring-2 ring-primary border-primary" : "hover:border-primary/50"
                      )}
                      onClick={() => setColorScheme(scheme.value as any)}
                    >
                      <CardContent className="p-3 flex flex-col items-center space-y-2">
                        <div className="flex space-x-1 mt-2">
                          <div className={`w-5 h-5 rounded-full ${scheme.primaryColor}`}></div>
                          <div className={`w-5 h-5 rounded-full ${scheme.accentColor}`}></div>
                        </div>
                        <span className="text-sm">{scheme.name}</span>
                        {colorScheme === scheme.value && (
                          <Badge className="bg-primary text-primary-foreground text-xs">
                            <Check className="h-3 w-3 mr-1" />
                            Выбрана
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Reset settings */}
              <div className="pt-4">
                <Button 
                  variant="outline" 
                  className="w-full hover:bg-secondary/80 transition-colors" 
                  onClick={() => {
                    setTheme("system");
                    setFontSize("medium");
                    setColorScheme("blue");
                    toast("Настройки сброшены", {
                      description: "Все настройки внешнего вида возвращены к значениям по умолчанию.",
                    });
                  }}
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Сбросить все настройки
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={saveSettings} 
                className="mr-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
              >
                Сохранить изменения
              </Button>
            </CardFooter>
          </Card>
          
          {/* Preview card to show theme changes */}
          <Card>
            <CardHeader>
              <CardTitle>Предпросмотр темы</CardTitle>
              <CardDescription>
                Здесь вы можете увидеть, как выглядит выбранная тема
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Элементы интерфейса</h3>
                  <div className="space-y-4 p-4 bg-background rounded-lg border">
                    <Button>Обычная кнопка</Button>
                    <Button variant="secondary" className="ml-2">Вторичная</Button>
                    <Button variant="destructive" className="ml-2">Удалить</Button>
                    <div className="mt-2">
                      <Label htmlFor="example">Поле ввода</Label>
                      <Input id="example" placeholder="Пример текста" />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Стиль текста</h3>
                  <div className="space-y-2 p-4 bg-background rounded-lg border">
                    <h1 className="text-2xl font-bold">Заголовок первого уровня</h1>
                    <h2 className="text-xl font-semibold">Заголовок второго уровня</h2>
                    <h3 className="text-lg font-medium">Заголовок третьего уровня</h3>
                    <p>Обычный текст для демонстрации выбранного размера шрифта и цветовой схемы.</p>
                    <p className="text-sm text-muted-foreground">Вторичный текст мельче и с другим цветом.</p>
                    <p className="text-primary">Текст основного цвета темы</p>
                  </div>
                </div>
              </div>
            </CardContent>
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
