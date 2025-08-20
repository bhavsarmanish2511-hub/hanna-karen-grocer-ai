import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Mic, 
  MicOff, 
  Send, 
  Minimize2, 
  Maximize2,
  Bot,
  User,
  Volume2
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'karen' | 'hanna';
  content: string;
  timestamp: Date;
  type: 'text' | 'suggestion' | 'analysis';
}

const initialMessages: Message[] = [
  {
    id: '1',
    sender: 'karen',
    content: 'Good afternoon, Hanna! I\'ve completed scanning your smart fridge and kitchen. I found 6 items that need restocking, including 2 special items for Ron. Would you like me to create a grocery list?',
    timestamp: new Date(Date.now() - 300000),
    type: 'analysis'
  },
  {
    id: '2',
    sender: 'hanna',
    content: 'Yes, please create the list. Also, what\'s our spending trend this month?',
    timestamp: new Date(Date.now() - 240000),
    type: 'text'
  },
  {
    id: '3',
    sender: 'karen',
    content: 'I\'ve generated your grocery list with 7 items totaling $35.30. Your spending is up 12% this week, mainly due to Ron\'s growth spurt - he\'s consuming 30% more snacks and juice. This is completely normal for his age!',
    timestamp: new Date(Date.now() - 120000),
    type: 'suggestion'
  }
];

export const KarenAI = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'hanna',
      content: inputMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate Karen's response
    setTimeout(() => {
      const responses = [
        'I\'ll analyze that for you right away, Hanna.',
        'Based on your current inventory, I recommend adding that to your next grocery list.',
        'Let me check your smart kitchen sensors for that information.',
        'That\'s a great question! I\'ve updated your household preferences.',
        'I\'ve noted that for Ron\'s dietary tracking. His growth is right on schedule!',
      ];
      
      const karenResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'karen',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        type: 'suggestion'
      };

      setMessages(prev => [...prev, karenResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
    // In a real implementation, this would start/stop voice recognition
    if (!isVoiceActive) {
      setTimeout(() => setIsVoiceActive(false), 3000);
    }
  };

  const getMessageIcon = (type: string, sender: string) => {
    if (sender === 'karen') {
      return <Bot className="h-4 w-4 text-neon-cyan" />;
    }
    return <User className="h-4 w-4 text-neon-purple" />;
  };

  const getMessageStyle = (sender: string) => {
    if (sender === 'karen') {
      return 'bg-neon-cyan/10 border-neon-cyan/30 text-foreground';
    }
    return 'bg-neon-purple/10 border-neon-purple/30 text-foreground ml-8';
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="relative w-14 h-14 rounded-full bg-gradient-primary shadow-neon hover:shadow-glow transition-all duration-300 animate-glow-pulse"
        >
          <Bot className="h-6 w-6 text-white" />
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-status-fresh text-white text-xs rounded-full flex items-center justify-center font-bold">
            3
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 w-96">
      <Card className="bg-gradient-card border-border/50 shadow-glow">
        {/* Header */}
        <div className="p-4 border-b border-border/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="p-2 rounded-full bg-neon-cyan/20 animate-glow-pulse">
                  <Bot className="h-5 w-5 text-neon-cyan" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-status-fresh rounded-full border-2 border-card" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Karen AI</h3>
                <p className="text-xs text-muted-foreground">Your Smart Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleVoice}
                className={`p-2 ${isVoiceActive ? 'text-status-fresh bg-status-fresh/10' : 'text-muted-foreground'}`}
              >
                <Volume2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="p-2 text-muted-foreground hover:text-foreground"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg border transition-all duration-200 ${getMessageStyle(message.sender)}`}
            >
              <div className="flex items-start gap-2">
                {getMessageIcon(message.type, message.sender)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-foreground">
                      {message.sender === 'karen' ? 'Karen' : 'Hanna'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {message.type !== 'text' && (
                      <Badge variant="outline" className="text-xs px-2 py-0">
                        {message.type}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-foreground">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="p-3 rounded-lg border bg-neon-cyan/10 border-neon-cyan/30">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-neon-cyan" />
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border/30">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Karen anything..."
                className="w-full px-3 py-2 pr-10 bg-card/50 border border-border/50 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-neon-cyan/50 transition-colors text-sm"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleVoice}
                className={`absolute right-1 top-1/2 transform -translate-y-1/2 p-1 ${
                  isVoiceActive ? 'text-status-fresh bg-status-fresh/10' : 'text-muted-foreground'
                }`}
              >
                {isVoiceActive ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="bg-gradient-primary hover:shadow-neon transition-all duration-300 text-white p-2"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Quick Actions */}
          <div className="flex gap-2 mt-3">
            <Badge
              variant="outline"
              className="cursor-pointer text-xs px-2 py-1 hover:bg-neon-cyan/10 hover:border-neon-cyan/50 transition-all"
              onClick={() => setInputMessage('Check expiry dates')}
            >
              Check expiry dates
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer text-xs px-2 py-1 hover:bg-neon-purple/10 hover:border-neon-purple/50 transition-all"
              onClick={() => setInputMessage('Add items for Ron')}
            >
              Add items for Ron
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};