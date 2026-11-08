# Portfólio - Marcos Martírio

---
## Desenvolvimento

Projeto em React + Vite.

```bash
npm install       # instala as dependências
npm run dev       # inicia o servidor de desenvolvimento
npm run build     # gera o build de produção na pasta dist/
npm run preview   # serve o build de produção localmente
npm run lint      # roda o ESLint
npm run test      # roda os testes (Vitest)
npm run format    # formata o código com o Prettier
npm run screenshots # recaptura a tela de cada projeto (usa o Chrome instalado)
```

A pasta `dist/` gerada pelo `npm run build` pode ser publicada em qualquer host de arquivos estáticos (Vercel, Netlify, GitHub Pages etc.).

---
## Sobre Mim

Olá! Eu sou Marcos Martírio, desenvolvedor Full Stack. Atuo há mais de 15 anos no mercado de tecnologia, com experiência sólida em suporte de TI. Em 2022, decidi migrar para o desenvolvimento, focando inicialmente em front-end por minha afinidade com design e composições visuais. Atualmente, estou expandindo meus conhecimentos em React.js, Java, Python, HTML5, CSS3 e JavaScript, além de criar APIs e projetos full stack com integração de IA (Ollama, ChatGPT).

Sou apaixonado por criar interfaces funcionais e interativas, e estou sempre buscando aprimorar minhas habilidades para contribuir em projetos inovadores.

---
## Principais Projetos

- [Davi Foto Vídeo](https://www.davifotovideo.com.br): site de fotografia e vídeo (Next.js)
- [Site Coach](https://site-coach-tree.vercel.app): landing page de coaching (Next.js)
- [Aliunde](https://aliunde.com.br): plataforma de gestão para pequenos negócios
- [Oia a Conta](https://oiaaconta.com.br): gestão de pedidos para restaurantes

A seção **Estudos e práticas** não lista projetos: mostra as tecnologias estudadas e as skills aplicadas,
definidas em `src/data/studies.js`.

### Projetos dinâmicos

A lista fica em `src/data/projects.js`. O **nome, a descrição, a imagem e a cor** de cada card são lidos ao vivo do site publicado
(`<title>`, `description`, `og:image`, `theme-color`) pela função `api/projects.js`. Quando um projeto é alterado, o portfólio
reflete a mudança em até 1 hora (cache da CDN), sem novo deploy.

- `fallback`: usado se o site estiver fora do ar ou com metadados genéricos ("Document", "React App" etc.).
- `override`: sempre vence o dado ao vivo; use só quando não der para corrigir as meta tags na origem.

**Telas dos projetos:** as imagens dentro da janela de navegador são capturas reais da primeira dobra de cada site
(1440×900), feitas por `npm run screenshots` e salvas em `public/screenshots/`. Rode o comando de novo quando o visual
de um projeto mudar. Projetos sem captura usam a imagem de compartilhamento (`og:image`) do próprio site.

**Descoberta automática (opcional):** defina no Vercel as variáveis `VERCEL_API_TOKEN` (token de leitura) e
`VERCEL_TEAM_ID`. Assim, todo projeto novo publicado na conta aparece sozinho no portfólio. Para esconder algum,
adicione o nome em `excludedVercelProjects`.

---

## Contato

Entre em contato comigo pelas redes sociais:

- [WhatsApp](https://wa.me/5579991071656?text=Ol%C3%A1,%20dei%20uma%20olhada%20em%20seu%20portfolio%20e%20entrei%20em%20contato.)
- [E-mail](mailto:marcos.martirio@gmail.com): marcos.martirio@gmail.com
- [LinkedIn](https://www.linkedin.com/in/marcos-santos-martirio-08075a123/)
- [GitHub](https://github.com/mmartirio)

---


Obrigado por visitar meu portfólio!
