# Outlet Fortaleza

Site de vitrine e vendas da **Outlet Fortaleza** — moda, calçados e acessórios de marca com até 70% OFF.

Site estático (HTML + CSS + JavaScript puro), sem dependências nem etapa de build.

## Como abrir

Abra `index.html` no navegador, ou rode um servidor local:

```bash
cd outlet-fortaleza
python3 -m http.server 8080
# acesse http://localhost:8080
```

## Funcionalidades

- Hero com destaque de liquidação, benefícios e estatísticas
- Categorias clicáveis + filtros, busca e ordenação de produtos
- Sacola de compras (salva no navegador) com total e preço no Pix
- Finalização do pedido pelo **WhatsApp** com a lista de itens
- Seção da loja física com mapa, horário e contato
- Newsletter com cupom, depoimentos e rodapé
- Layout responsivo (celular, tablet e desktop)

## Como personalizar

Tudo fica no topo de `script.js`:

- `CONFIG.whatsapp` — número do WhatsApp (DDI + DDD + número, só dígitos)
- `CATEGORIES` — categorias, ícones e cores
- `PRODUCTS` — catálogo (nome, marca, categoria, preço e preço original)

Endereço, horário e telefone ficam na seção `#loja` de `index.html`; cores no `:root` de `styles.css`.

## Publicar

Por ser estático, pode ser publicado em GitHub Pages, Netlify ou Vercel apontando para a pasta `outlet-fortaleza/`.
