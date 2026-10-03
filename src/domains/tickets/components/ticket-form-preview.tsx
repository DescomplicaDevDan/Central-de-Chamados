import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export function TicketFormPreview() {
  return (
    <Card>
        <div>
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-slate-950">
                Abrir novo chamado
                </h2>

                <Badge variant="warning">Em breve</Badge>
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-600">
                Descreva sua solicitação para que o atendimento possa começar.
            </p>
        </div>

      <form className="mt-6 space-y-5">
        <div>
          <Label htmlFor="ticket-title">
            Título <span aria-hidden="true">*</span>
          </Label>

          <Input
            className="mt-2"
            id="ticket-title"
            name="title"
            placeholder="Ex.: Não consigo acessar o sistema"
          />
        </div>

        <div>
          <Label htmlFor="ticket-description">
            Descrição <span aria-hidden="true">*</span>
          </Label>

          <Textarea
            className="mt-2"
            id="ticket-description"
            name="description"
            placeholder="Explique o que aconteceu e inclua informações relevantes."
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <Label htmlFor="ticket-category">
              Categoria <span aria-hidden="true">*</span>
            </Label>

            <Select className="mt-2" id="ticket-category" name="category">
              <option value="">Selecione uma categoria</option>
              <option value="access">Acesso e permissões</option>
              <option value="equipment">Equipamentos</option>
              <option value="systems">Sistemas</option>
              <option value="other">Outros</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="ticket-priority">
              Prioridade <span aria-hidden="true">*</span>
            </Label>

            <Select className="mt-2" id="ticket-priority" name="priority">
              <option value="">Selecione uma prioridade</option>
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </Select>
          </div>
        </div>

        <Button disabled type="submit">
          Criar chamado
        </Button>
      </form>
    </Card>
  );
}