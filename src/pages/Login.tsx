
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, BookOpen, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would normally handle authentication
    // For now, we'll just show a success toast and navigate
    toast({
      title: "Вход выполнен",
      description: `Вы успешно вошли как ${role === "student" ? "ученик" : role === "teacher" ? "учитель" : "родитель"}`,
    });
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted/50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <GraduationCap className="h-12 w-12 text-primary mx-auto mb-2" />
          <h1 className="text-3xl font-bold text-edu-blue">ШКОЛЬНЫЙ ЖУРНАЛ</h1>
          <p className="text-muted-foreground">Электронный журнал для школ России</p>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Войти в систему</CardTitle>
            <CardDescription>
              Выберите тип учетной записи и введите данные для входа
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full" onValueChange={setRole}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Ученик</span>
                </TabsTrigger>
                <TabsTrigger value="teacher" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Учитель</span>
                </TabsTrigger>
                <TabsTrigger value="parent" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Родитель</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="student">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Имя пользователя</Label>
                    <Input
                      id="username"
                      placeholder="Номер ученика"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Пароль</Label>
                      <a href="#" className="text-sm text-primary hover:underline">
                        Забыли пароль?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Войти
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="teacher">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Имя пользователя</Label>
                    <Input
                      id="username"
                      placeholder="Логин учителя"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Пароль</Label>
                      <a href="#" className="text-sm text-primary hover:underline">
                        Забыли пароль?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Войти
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="parent">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Имя пользователя</Label>
                    <Input
                      id="username"
                      placeholder="Логин родителя"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Пароль</Label>
                      <a href="#" className="text-sm text-primary hover:underline">
                        Забыли пароль?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Войти
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              <span>Нет учетной записи? </span>
              <a href="#" className="text-primary hover:underline">
                Обратитесь к администратору школы
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
