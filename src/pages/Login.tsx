
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, BookOpen, User, Loader2, ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const Login = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { login, signup, resetPassword, isLoading } = useAuth();

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "teacher" | "admin">("student");

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Успешный вход в систему");
      navigate("/");
    } catch (error) {
      // Error is handled in auth context
    }
  };

  // Registration form schema
  const registerSchema = z.object({
    name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
    email: z.string().email("Введите корректный email"),
    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
    confirmPassword: z.string(),
    role: z.enum(["student", "teacher", "admin"])
  }).refine(data => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"]
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "student"
    }
  });

  // Handle registration
  const onRegisterSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      await signup(values.email, values.password, values.role, values.name);
      toast.success("Регистрация успешна! Проверьте электронную почту для подтверждения.");
      setActiveTab("login");
    } catch (error) {
      // Error is handled in auth context
    }
  };

  // Password reset form schema
  const resetPasswordSchema = z.object({
    email: z.string().email("Введите корректный email")
  });

  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: "" }
  });

  // Handle password reset
  const onResetPasswordSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    try {
      await resetPassword(values.email);
      toast.success("Инструкции по сбросу пароля отправлены на вашу почту");
      setResetPasswordDialogOpen(false);
    } catch (error) {
      // Error is handled in auth context
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background/90 to-muted/50">
      <div className="hidden lg:flex flex-1 bg-muted/30 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10 z-0" />
        <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto px-8 py-12 text-center">
          <GraduationCap className="h-24 w-24 text-primary mb-8 animate-bounce" />
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ШКОЛЬНЫЙ ЖУРНАЛ
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Современная платформа для эффективного управления образовательным процессом
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
            <div className="bg-background/70 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <BookOpen className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Для учеников</h3>
              <p className="text-muted-foreground">Удобный доступ к расписанию, домашним заданиям и оценкам</p>
            </div>
            <div className="bg-background/70 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <GraduationCap className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Для учителей</h3>
              <p className="text-muted-foreground">Инструменты для ведения журнала, выставления оценок и учета посещаемости</p>
            </div>
            <div className="bg-background/70 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <User className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Для администрации</h3>
              <p className="text-muted-foreground">Полный контроль над образовательным процессом и аналитикой</p>
            </div>
            <div className="bg-background/70 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Уведомления</h3>
              <p className="text-muted-foreground">Мгновенные уведомления о важных событиях для всех пользователей</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <GraduationCap className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ШКОЛЬНЫЙ ЖУРНАЛ
            </h1>
            <p className="text-muted-foreground mt-2">Электронный журнал для школ</p>
          </div>

          <Card className="border shadow-lg overflow-hidden backdrop-blur-sm bg-background/90">
            <CardHeader className="bg-muted/20 space-y-1 pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">
                  {activeTab === "login" ? "Добро пожаловать" : "Создание аккаунта"}
                </CardTitle>
                
                {activeTab === "register" && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setActiveTab("login")}
                    className="flex items-center text-sm"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Назад
                  </Button>
                )}
              </div>
              <CardDescription>
                {activeTab === "login" 
                  ? "Войдите в систему, чтобы продолжить" 
                  : "Заполните форму для регистрации"}
              </CardDescription>
            </CardHeader>

            {activeTab === "login" ? (
              <>
                <CardContent className="pt-6">
                  <Tabs defaultValue="student" className="w-full" onValueChange={(value) => setRole(value as any)}>
                    <TabsList className="grid grid-cols-3 mb-6">
                      <TabsTrigger value="student" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>Ученик</span>
                      </TabsTrigger>
                      <TabsTrigger value="teacher" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        <GraduationCap className="h-4 w-4" />
                        <span>Учитель</span>
                      </TabsTrigger>
                      <TabsTrigger value="admin" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        <User className="h-4 w-4" />
                        <span>Админ</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="student">
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="student@school.ru"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="pl-10 transition-all focus-visible:ring-primary"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="password">Пароль</Label>
                            <Button 
                              type="button" 
                              variant="link" 
                              className="p-0 h-auto text-sm"
                              onClick={() => setResetPasswordDialogOpen(true)}
                            >
                              Забыли пароль?
                            </Button>
                          </div>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              className="pl-10 pr-10 transition-all focus-visible:ring-primary"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Вход...
                            </>
                          ) : (
                            "Войти"
                          )}
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="teacher">
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="teacher@school.ru"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="pl-10 transition-all focus-visible:ring-primary"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="password">Пароль</Label>
                            <Button 
                              type="button" 
                              variant="link" 
                              className="p-0 h-auto text-sm"
                              onClick={() => setResetPasswordDialogOpen(true)}
                            >
                              Забыли пароль?
                            </Button>
                          </div>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              className="pl-10 pr-10 transition-all focus-visible:ring-primary"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Вход...
                            </>
                          ) : (
                            "Войти"
                          )}
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="admin">
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="admin@school.ru"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="pl-10 transition-all focus-visible:ring-primary"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="password">Пароль</Label>
                            <Button 
                              type="button" 
                              variant="link" 
                              className="p-0 h-auto text-sm"
                              onClick={() => setResetPasswordDialogOpen(true)}
                            >
                              Забыли пароль?
                            </Button>
                          </div>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              className="pl-10 pr-10 transition-all focus-visible:ring-primary"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Вход...
                            </>
                          ) : (
                            "Войти"
                          )}
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 bg-muted/20 mt-4">
                  <div className="text-center text-sm text-muted-foreground">
                    <span>Нет учетной записи? </span>
                    <Button variant="link" className="p-0 h-auto" onClick={() => setActiveTab("register")}>
                      Зарегистрироваться
                    </Button>
                  </div>
                </CardFooter>
              </>
            ) : (
              <CardContent className="pt-6">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Имя и фамилия</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="Иван Иванов" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input type="email" placeholder="example@school.ru" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Пароль</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input 
                                type={showPassword ? "text" : "password"} 
                                className="pl-10 pr-10" 
                                {...field} 
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                                onClick={togglePasswordVisibility}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Подтвердите пароль</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input 
                                type={showConfirmPassword ? "text" : "password"} 
                                className="pl-10 pr-10" 
                                {...field} 
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                                onClick={toggleConfirmPasswordVisibility}
                              >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Роль</FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-3 gap-2">
                              <Button 
                                type="button"
                                variant={field.value === "student" ? "default" : "outline"}
                                className={`flex items-center justify-center gap-2 ${field.value === "student" ? "bg-primary text-primary-foreground" : ""}`}
                                onClick={() => field.onChange("student")}
                              >
                                <BookOpen className="h-4 w-4" />
                                <span>Ученик</span>
                              </Button>
                              <Button 
                                type="button"
                                variant={field.value === "teacher" ? "default" : "outline"}
                                className={`flex items-center justify-center gap-2 ${field.value === "teacher" ? "bg-primary text-primary-foreground" : ""}`}
                                onClick={() => field.onChange("teacher")}
                              >
                                <GraduationCap className="h-4 w-4" />
                                <span>Учитель</span>
                              </Button>
                              <Button 
                                type="button"
                                variant={field.value === "admin" ? "default" : "outline"}
                                className={`flex items-center justify-center gap-2 ${field.value === "admin" ? "bg-primary text-primary-foreground" : ""}`}
                                onClick={() => field.onChange("admin")}
                              >
                                <User className="h-4 w-4" />
                                <span>Админ</span>
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Регистрация...
                        </>
                      ) : (
                        "Зарегистрироваться"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            )}
          </Card>
        </div>
      </div>

      {/* Password Reset Dialog */}
      <Dialog open={resetPasswordDialogOpen} onOpenChange={setResetPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Сброс пароля</DialogTitle>
            <DialogDescription>
              Введите ваш email для получения инструкций по сбросу пароля.
            </DialogDescription>
          </DialogHeader>

          <Form {...resetPasswordForm}>
            <form onSubmit={resetPasswordForm.handleSubmit(onResetPasswordSubmit)} className="space-y-4">
              <FormField
                control={resetPasswordForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="email" placeholder="your@email.com" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setResetPasswordDialogOpen(false)}>
                  Отмена
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    "Отправить"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
