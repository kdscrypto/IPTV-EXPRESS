import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, Check, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const ContactMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setMessages(data || []);
    } catch {
      toast({ title: "Erreur", description: "Impossible de charger les messages", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const toggleRead = async (msg: ContactMessage) => {
    const { error } = await supabase
      .from("contact_messages")
      .update({ is_read: !msg.is_read })
      .eq("id", msg.id);
    if (!error) {
      setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, is_read: !m.is_read } : m)));
    }
  };

  const deleteMessage = async (id: string) => {
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (!error) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      toast({ title: "Message supprimé" });
    }
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          Messages de contact
          {unreadCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </h3>
        <Button variant="outline" size="sm" onClick={fetchMessages}>
          Rafraîchir
        </Button>
      </div>

      {messages.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">Aucun message pour le moment.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-xl border p-4 transition-colors ${
                msg.is_read ? "border-border bg-card/50" : "border-primary/30 bg-primary/5"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm">{msg.name}</span>
                    <span className="text-xs text-muted-foreground">{msg.email}</span>
                    {!msg.is_read && (
                      <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded font-medium">
                        Nouveau
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium mt-1">{msg.subject}</p>
                  <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{msg.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(msg.created_at).toLocaleString("fr-FR")}
                  </p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => toggleRead(msg)} title={msg.is_read ? "Marquer non lu" : "Marquer lu"}>
                    <Check className={`h-4 w-4 ${msg.is_read ? "text-primary" : "text-muted-foreground"}`} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteMessage(msg.id)} title="Supprimer">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactMessages;
