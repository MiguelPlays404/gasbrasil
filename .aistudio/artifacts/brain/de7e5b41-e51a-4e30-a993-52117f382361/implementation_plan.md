# Plano de Implementação - Landing Page Gás Brasil (Liquigás Bauru)

Landing page inspirada no design oficial da Liquigás, com paleta verde (`#008751`), laranja (`#FF6B00`) e branco com fundo suave (`#F1F4F9`), clean, minimalista e de alta performance.

---

## 1. Melhorias Recentes Implementadas

### A. Carrossel de Fotos (Hero)
- **6 Imagens 16:9 em Alta Resolução**:
  1. Frota oficial Liquigás e entrega rápida.
  2. Família e segurança na cozinha.
  3. Banner com facilidade de parcelamento em até 3x no cartão.
  4. Entregador uniformizado com atendimento amigo e instalação segura.
  5. Cozinha profissional/restaurante com chama azul e botijão P45.
  6. Pátio dos caminhões e depósitos estratégicos em Bauru.
- **Transição Contínua e Automática**: O carrossel alterna automaticamente a cada 5,5 segundos sem travar e sem necessidade de setas.
- **Botões e Textos Compactos**: Textos reposicionados e botões proporcionais para valorizar e destacar as fotografias.
- **Seção de Confiança Natural**: A barra verde pesada foi substituída por uma faixa de destaques em cartões refinados, sem divisões bruscas.

### B. Notificação Push em Tempo Real (Social Proof)
- **Animação Suave de Entrada e Saída**: Transição fluida de slide e opacidade tanto ao surgir quanto ao sumir da tela.
- **Intervalo Orgânico (~40 segundos)**: Variação dinâmica entre 33s e 47s para naturalidade.
- **Design Compacto e Objetivo**: Exibe somente nome do cliente, bairro de Bauru, botijão solicitado e tempo decorrido (sem expor forma de pagamento).

### C. Cabeçalho Mobile-First
- **Número de Telefone Sem Quebras**: Ajuste responsivo com `whitespace-nowrap`, evitando que o número `(14) 98821-5634` seja dividido em várias linhas em telas pequenas.
- **Identidade Oficial Gás Brasil**: Logo 3D destacada e selo de revendedora oficial.

### D. Efeito de Revelação na Rolagem (Scroll Reveal)
- Efeito suave com `IntersectionObserver` que faz com que os módulos de produtos, depósitos, programa social e avaliações surjam gradualmente à medida que o usuário desce a página.

---

## 2. Mapa dos 2 Depósitos em Bauru
- **Depósito 1 (Jardim Redentor)**: Rua Flávio Fongaro, 3-51.
- **Depósito 2 (Vila Seabra / Av. Nuno de Assis)**: Av. Nuno de Assis, 15-53.
- Mapa interativo com alternador direto e rotas no Google Maps.
