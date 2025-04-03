
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, BookOpen, User, Loader2, ArrowLeft, Mail, Lock, Eye, EyeOff, CheckCircle2, School } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [loginMode, setLoginMode] = useState<"login" | "register">("login");
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
      toast({
        title: "Успешный вход",
        description: "Добро пожаловать в систему",
        variant: "default",
      });
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
      toast({
        title: "Успешная регистрация!",
        description: "Проверьте электронную почту для подтверждения аккаунта.",
        variant: "default",
      });
      setLoginMode("login");
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
      toast({
        title: "Сброс пароля",
        description: "Инструкции по сбросу пароля отправлены на вашу почту",
        variant: "default",
      });
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
    <div className="flex min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden animate-fade-in">
        <div className="absolute inset-0 z-0 bg-pattern-grid opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 z-0"></div>
        
        <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto px-8 py-12 text-center">
          <div className="glass-card p-6 rounded-full mb-8 animate-bounce duration-2000">
            <School className="h-20 w-20 text-primary" />
          </div>
          
          <h1 className="text-6xl font-bold mb-6 text-gradient animate-slide-in">
            ШКОЛЬНЫЙ ЖУРНАЛ
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-md mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Современная платформа для эффективного управления образовательным процессом
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
            <div className="glass-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 staggered-fade-in">
              <div className="p-6 flex flex-col items-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Для учеников</h3>
                <p className="text-muted-foreground text-center">Удобный доступ к расписанию, домашним заданиям и оценкам</p>
              </div>
            </div>
            
            <div className="glass-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 staggered-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="p-6 flex flex-col items-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Для учителей</h3>
                <p className="text-muted-foreground text-center">Инструменты для ведения журнала, выставления оценок и учета посещаемости</p>
              </div>
            </div>
            
            <div className="glass-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 staggered-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="p-6 flex flex-col items-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Для администрации</h3>
                <p className="text-muted-foreground text-center">Полный контроль над образовательным процессом и аналитикой</p>
              </div>
            </div>
            
            <div className="glass-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 staggered-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="p-6 flex flex-col items-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Уведомления</h3>
                <p className="text-muted-foreground text-center">Мгновенные уведомления о важных событиях для всех пользователей</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 animate-slide-in">
        <div className="w-full max-w-md">
          <div className="text-center mb-10 lg:hidden animate-fade-in">
            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
              <School className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ШКОЛЬНЫЙ ЖУРНАЛ
            </h1>
            <p className="text-muted-foreground mt-2">Электронный журнал для современной школы</p>
          </div>

          <Card className="border shadow-xl overflow-hidden glass-card animate-scale-in">
            <CardHeader className="bg-muted/20 space-y-1 pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">
                  {loginMode === "login" ? "Добро пожаловать" : "Создание аккаунта"}
                </CardTitle>
                
                {loginMode === "register" && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setLoginMode("login")}
                    className="flex items-center text-sm"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Назад
                  </Button>
                )}
              </div>
              <CardDescription>
                {loginMode === "login" 
                  ? "Войдите в систему, чтобы продолжить" 
                  : "Заполните форму для регистрации"}
              </CardDescription>
            </CardHeader>

            {loginMode === "login" ? (
              <div>
                <CardContent className="pt-6">
                  <Tabs defaultValue="student" className="w-full" onValueChange={(value) => setRole(value as any)}>
                    <TabsList className="grid grid-cols-3 mb-6 p-1">
                      <TabsTrigger value="student" className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        <span>Ученик</span>
                      </TabsTrigger>
                      <TabsTrigger value="teacher" className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        <span>Учитель</span>
                      </TabsTrigger>
                      <TabsTrigger value="admin" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>Админ</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="student">
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
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
                              className="p-0 h-auto text-sm text-primary/80 hover:text-primary"
                              onClick={() => setResetPasswordDialogOpen(true)}
                            >
                              Забыли пароль?
                            </Button>
                          </div>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
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
                          <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
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
                              className="p-0 h-auto text-sm text-primary/80 hover:text-primary"
                              onClick={() => setResetPasswordDialogOpen(true)}
                            >
                              Забыли пароль?
                            </Button>
                          </div>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
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
                          <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
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
                              className="p-0 h-auto text-sm text-primary/80 hover:text-primary"
                              onClick={() => setResetPasswordDialogOpen(true)}
                            >
                              Забыли пароль?
                            </Button>
                          </div>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
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
                  <div className="text-center text-sm">
                    <span className="text-muted-foreground">Нет учетной записи? </span>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto font-medium text-primary"
                      onClick={() => setLoginMode("register")}
                    >
                      Зарегистрироваться
                    </Button>
                  </div>
                </CardFooter>
              </div>
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
                            <div className="relative group">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
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
                            <div className="relative group">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
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
                            <div className="relative group">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
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
                            <div className="relative group">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
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
                                variant="outline"
                                className={`flex items-center justify-center gap-2 transition-all ${field.value === "student" ? "bg-primary text-primary-foreground border-primary" : ""}`}
                                onClick={() => field.onChange("student")}
                              >
                                <BookOpen className="h-4 w-4" />
                                <span>Ученик</span>
                              </Button>
                              <Button 
                                type="button"
                                variant="outline"
                                className={`flex items-center justify-center gap-2 transition-all ${field.value === "teacher" ? "bg-primary text-primary-foreground border-primary" : ""}`}
                                onClick={() => field.onChange("teacher")}
                              >
                                <GraduationCap className="h-4 w-4" />
                                <span>Учитель</span>
                              </Button>
                              <Button 
                                type="button"
                                variant="outline"
                                className={`flex items-center justify-center gap-2 transition-all ${field.value === "admin" ? "bg-primary text-primary-foreground border-primary" : ""}`}
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
        <DialogContent className="sm:max-w-[425px] glass-card">
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
                      <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input type="email" placeholder="your@email.com" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setResetPasswordDialogOpen(false)}
                >
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
