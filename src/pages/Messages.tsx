
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, Send, PaperclipIcon, Smile, MoreVertical, 
  Phone, Video, Info, ArrowLeftCircle, CheckCircle, CircleEllipsis 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

// Mock data for chats
const mockChats = [
  {
    id: 1, 
    name: "Иванов Иван Иванович", 
    avatar: "", 
    role: "teacher",
    lastMessage: "Добрый день! Проверьте, пожалуйста, домашнее задание",
    lastTime: "14:30",
    unread: 2
  },
  {
    id: 2, 
    name: "Петрова Мария", 
    avatar: "", 
    role: "student",
    lastMessage: "Спасибо за помощь с задачей!",
    lastTime: "Вчера",
    unread: 0
  },
  {
    id: 3, 
    name: "9A Класс", 
    avatar: "", 
    role: "group",
    lastMessage: "Александр: Домашняя работа на понедельник?",
    lastTime: "15.03",
    unread: 5,
    participants: 23
  },
  {
    id: 4, 
    name: "Сидорова Екатерина Павловна", 
    avatar: "", 
    role: "admin",
    lastMessage: "Совещание перенесено на вторник, 10:00",
    lastTime: "12.03",
    unread: 0
  }
];

// Mock messages for selected chat
const mockMessages = [
  {
    id: 1,
    senderId: 999, // current user
    text: "Здравствуйте, Иван Иванович! Хотел уточнить задание на завтра.",
    time: "2025-04-03T13:30:00",
    status: "read"
  },
  {
    id: 2,
    senderId: 1,
    text: "Добрый день! Задание указано в электронном журнале, проверьте пожалуйста там.",
    time: "2025-04-03T13:35:00",
    status: "read"
  },
  {
    id: 3,
    senderId: 999,
    text: "Извините, не могу найти. Не могли бы вы подсказать страницу и номера заданий?",
    time: "2025-04-03T13:40:00",
    status: "read"
  },
  {
    id: 4,
    senderId: 1,
    text: "Конечно, страница 142, задания 25-30.",
    time: "2025-04-03T13:42:00",
    status: "read"
  },
  {
    id: 5,
    senderId: 1,
    text: "Также не забудьте прочитать теорию на страницах 140-141.",
    time: "2025-04-03T13:43:00",
    status: "read"
  },
  {
    id: 6,
    senderId: 999,
    text: "Большое спасибо! Буду выполнять.",
    time: "2025-04-03T13:45:00",
    status: "read"
  },
  {
    id: 7,
    senderId: 1,
    text: "Добрый день! Проверьте, пожалуйста, домашнее задание",
    time: "2025-04-04T14:30:00",
    status: "delivered"
  }
];

const Messages = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  
  const filteredChats = mockChats.filter(chat => {
    // Filter by search
    if (search && !chat.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    
    // Filter by tab
    if (currentTab === "unread" && chat.unread === 0) {
      return false;
    }
    
    return true;
  });
  
  const selectedChatData = selectedChat ? mockChats.find(c => c.id === selectedChat) : null;
  
  const sendMessage = () => {
    if (!message.trim()) return;
    
    toast.success("Сообщение отправлено");
    setMessage("");
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "teacher": return "Учитель";
      case "student": return "Ученик";
      case "admin": return "Администратор";
      case "group": return "Группа";
      default: return "";
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Сообщения</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Chats list */}
        <Card className="lg:col-span-1 flex flex-col">
          <CardHeader className="p-4 pb-2 flex-shrink-0">
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск чатов..."
                className="pl-9 pr-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">Все</TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">
                  Непрочитанные
                  <Badge className="ml-1 bg-primary text-white">{mockChats.reduce((acc, chat) => acc + chat.unread, 0)}</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          
          <ScrollArea className="flex-1 p-1">
            {filteredChats.length > 0 ? (
              filteredChats.map(chat => (
                <div
                  key={chat.id}
                  className={`flex items-center p-3 rounded-lg mb-1 cursor-pointer transition-all ${
                    selectedChat === chat.id ? 'bg-primary/10' : 'hover:bg-muted'
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={chat.avatar} />
                      <AvatarFallback className={`${chat.role === 'group' ? 'bg-blue-100 text-blue-600' : 'bg-primary/10 text-primary'}`}>
                        {getInitials(chat.name)}
                      </AvatarFallback>
                    </Avatar>
                    {chat.unread > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-white">
                        {chat.unread > 9 ? '9+' : chat.unread}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                      <span className="text-xs text-muted-foreground">{chat.lastTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                      {chat.role === 'group' && (
                        <span className="text-xs bg-secondary text-muted-foreground rounded-full px-1.5">
                          {chat.participants}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>Нет чатов для отображения</p>
              </div>
            )}
          </ScrollArea>
          
          <CardFooter className="p-4 border-t">
            <Button className="w-full">
              Новое сообщение
            </Button>
          </CardFooter>
        </Card>
        
        {/* Chat area */}
        <Card className="lg:col-span-2 flex flex-col">
          {selectedChat ? (
            <>
              <CardHeader className="p-4 flex-shrink-0 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 mr-2 lg:hidden"
                      onClick={() => setSelectedChat(null)}
                    >
                      <ArrowLeftCircle className="h-5 w-5" />
                    </Button>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedChatData?.avatar} />
                      <AvatarFallback className={`${selectedChatData?.role === 'group' ? 'bg-blue-100 text-blue-600' : 'bg-primary/10 text-primary'}`}>
                        {selectedChatData ? getInitials(selectedChatData.name) : '??'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <h3 className="font-semibold">{selectedChatData?.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {selectedChatData?.role === 'group' 
                          ? `${selectedChatData?.participants} участников` 
                          : getRoleLabel(selectedChatData?.role || '')}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <ScrollArea className="flex-1 p-4">
                <div className="flex flex-col space-y-4">
                  {mockMessages.map((msg) => {
                    const isMe = msg.senderId === 999;
                    const time = new Date(msg.time);
                    
                    return (
                      <div 
                        key={msg.id} 
                        className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[75%] rounded-2xl p-3 ${
                            isMe 
                              ? 'bg-primary text-white rounded-br-none' 
                              : 'bg-secondary rounded-bl-none'
                          }`}
                        >
                          <p>{msg.text}</p>
                          <div className={`text-xs mt-1 flex justify-end items-center gap-1 ${
                            isMe ? 'text-white/70' : 'text-muted-foreground'
                          }`}>
                            {format(time, 'HH:mm')}
                            {isMe && (
                              msg.status === 'read' 
                                ? <CheckCircle className="h-3 w-3 text-blue-300" /> 
                                : <CircleEllipsis className="h-3 w-3" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
              
              <CardFooter className="p-4 border-t">
                <div className="flex items-center gap-2 w-full">
                  <Button variant="ghost" size="icon" className="flex-shrink-0">
                    <PaperclipIcon className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Введите сообщение..."
                    className="flex-1"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <Button variant="ghost" size="icon" className="flex-shrink-0">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button onClick={sendMessage} className="flex-shrink-0">
                    <Send className="h-5 w-5 mr-1" />
                    <span>Отправить</span>
                  </Button>
                </div>
              </CardFooter>
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center p-8">
                <Send className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Выберите чат</h3>
                <p className="text-muted-foreground">
                  Выберите существующий чат или начните новую беседу
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Messages;
