
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { toast } = useToast();

  const saveSettings = () => {
    toast({
      title: "Настройки сохранены",
      description: "Ваши настройки были успешно сохранены.",
    });
  };

  return (
    <div className="container p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Настройки</h1>

      <Tabs defaultValue="profile" className="w-full">
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
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="darkMode">Темная тема</Label>
                <Switch id="darkMode" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fontSize">Размер шрифта</Label>
                <Select defaultValue="medium">
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
              <div className="space-y-2">
                <Label htmlFor="colorScheme">Цветовая схема</Label>
                <Select defaultValue="blue">
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите цветовую схему" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Синяя</SelectItem>
                    <SelectItem value="green">Зеленая</SelectItem>
                    <SelectItem value="red">Красная</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>Сохранить изменения</Button>
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
