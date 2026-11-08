# Portfólio · Marcos Martírio

Portfólio pessoal de desenvolvedor Full Stack, feito em React + Vite e publicado na Vercel.

**Acesse:** [portfolio-mmartirio.vercel.app](https://portfolio-mmartirio.vercel.app)

---

## Destaques

- **Projetos dinâmicos:** nome, descrição, imagem e cor de cada projeto são lidos ao vivo dos sites publicados. Se um projeto muda, o portfólio muda junto, sem novo deploy.
- **Telas reais dos projetos:** cada card mostra uma captura da primeira dobra do site, na proporção exata da janela de navegador.
- **Interface animada:** retrato "saindo do portal" no topo, painéis de projetos que se empilham na rolagem com inclinação 3D no mouse, revelação de conteúdo ao rolar e CTA de WhatsApp em forma de conversa.
- **Acessível:** navegação por teclado, textos alternativos e respeito à preferência do sistema por "reduzir movimento".
- **Performático:** imagem principal pré-carregada com prioridade alta, imagens em WebP e efeitos de rolagem sem recálculos de layout forçados.

## Tecnologias

| Área | Ferramentas |
|---|---|
| Interface | React 19, Vite 7, CSS puro |
| Back-end | Vercel Functions (`api/`), Node.js |
| Qualidade | ESLint, Vitest, Testing Library, Prettier, Husky + lint-staged, GitHub Actions |
| Imagens | sharp, vite-plugin-image-optimizer, puppeteer-core (capturas de tela) |

---

## Como rodar

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

O site abre em `http://localhost:5173`. Em desenvolvimento, `/api/projects` é servido pelo próprio Vite com o mesmo código da função da Vercel.

### Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Serve o build de produção localmente |
| `npm run lint` / `npm run lint:fix` | Verifica / corrige o código com ESLint |
| `npm test` / `npm run test:watch` | Roda os testes (Vitest) |
| `npm run format` | Formata o código com Prettier |
| `npm run screenshots` | Recaptura a tela de cada projeto (usa o Chrome instalado) |

---

## Estrutura

```
api/projects.js              Função da Vercel: GET /api/projects
server/projectMetadata.js    Leitura dos metadados dos sites e montagem da lista
scripts/capture-screenshots.mjs  Captura das telas dos projetos
public/hero/                 Imagens do topo (pré-carregadas no index.html)
public/screenshots/          Capturas das telas dos projetos
src/
  components/                Seções da página (Header, Profile, HeroArt, About, Projects, Footer...)
  data/projects.js           Lista de projetos exibidos
  data/studies.js            Tecnologias e skills da seção "Estudos e práticas"
  data/screenshots.json      Índice das capturas (gerado pelo script)
  hooks/                     Dados ao vivo, revelação na rolagem e inclinação no mouse
```

---

## Projetos dinâmicos

A lista de projetos fica em `src/data/projects.js`. A função `api/projects.js` abre cada site publicado e lê:

| Dado do card | De onde vem |
|---|---|
| Nome | `og:site_name`, `og:title` ou `<title>` (só a primeira parte, antes de `\|` ou `-`) |
| Descrição | `og:description` ou `<meta name="description">` |
| Imagem | captura local; se não houver, `og:image` do site |
| Cor de destaque | `<meta name="theme-color">` |

A resposta fica em cache na CDN da Vercel por **1 hora** e é revalidada em segundo plano. Assim, uma mudança no site aparece no portfólio em até uma hora. Se a função não responder, a página usa os dados locais.

Títulos genéricos ("Document", "React App", "Login"...), descrições padrão de templates e imagens apontando para `localhost` são ignorados ou corrigidos automaticamente.

### Campos de cada projeto

```js
{
  id: 'oia-a-conta',
  vercelProject: 'oia-a-conta-frontend',
  url: 'https://oiaaconta.com.br',
  category: 'Produto digital',
  technologies: 'React · Vite',
  fallback: { name: 'Oia a Conta', description: '...' },
  override: { name: '...' },
  themeColor: '#d74421',
}
```

| Campo | Obrigatório | Função |
|---|---|---|
| `id` | sim | Identificador único; também nomeia a captura de tela |
| `url` | sim | Endereço publicado, de onde os dados são lidos |
| `category` / `technologies` | não | Textos exibidos no card |
| `vercelProject` | não | Nome do projeto na Vercel; evita que a descoberta automática o duplique |
| `fallback` | não | Nome e descrição usados se o site estiver fora do ar ou com metadados genéricos |
| `override` | não | Sempre vence o dado ao vivo; use só se não der para corrigir as meta tags na origem |
| `themeColor` | não | Força uma cor de destaque em vez da `theme-color` do site |

### Descoberta automática (opcional)

Com as variáveis abaixo configuradas no projeto da Vercel, todo projeto novo publicado na conta aparece sozinho no portfólio:

| Variável | Valor |
|---|---|
| `VERCEL_API_TOKEN` | Token de acesso da Vercel (leitura) |
| `VERCEL_TEAM_ID` | ID do time na Vercel |

Para esconder um projeto da descoberta, adicione o nome dele em `excludedVercelProjects`, em `src/data/projects.js`. Em desenvolvimento, as mesmas variáveis podem ficar num arquivo `.env.local`.

### Telas dos projetos

As imagens dentro da janela de navegador são capturas reais da primeira dobra de cada site, em 1440×900 (a mesma proporção 16:10 da janela, então nada é cortado):

```bash
npm run screenshots
```

O script abre cada site no Chrome instalado, espera carregar, aceita avisos de cookies, captura a tela e salva em `public/screenshots/<id>.webp`, atualizando `src/data/screenshots.json`. Rode de novo sempre que o visual de um projeto mudar. Se o Chrome estiver num caminho fora do padrão, defina `CHROME_PATH`.

---

## Estudos e práticas

Essa seção não lista projetos: mostra as tecnologias estudadas, agrupadas por área, e as skills aplicadas. O conteúdo fica em `src/data/studies.js` (`techGroups` e `skills`).

---

## Qualidade e deploy

- **Testes:** Vitest + Testing Library cobrem a leitura de metadados, a lista de projetos, o menu e o rodapé.
- **Pre-commit:** Husky + lint-staged rodam o ESLint nos arquivos alterados.
- **CI:** o GitHub Actions roda lint, testes e build a cada push e pull request na `master`.
- **Deploy:** o projeto está ligado à Vercel; cada push na `master` publica automaticamente em produção.

---

## Sobre mim

Sou Marcos Martírio, desenvolvedor Full Stack. Atuo há mais de 15 anos em tecnologia, com experiência sólida em suporte de TI. Em 2022 migrei para o desenvolvimento, começando pelo front-end por afinidade com design e interfaces. Hoje trabalho com React.js, JavaScript, HTML5 e CSS3 no front-end, Python e Java no back-end, e crio projetos full stack com integração de IA (Ollama, ChatGPT).

## Contato

- **WhatsApp:** [(79) 99107-1656](https://wa.me/5579991071656?text=Ol%C3%A1,%20dei%20uma%20olhada%20em%20seu%20portfolio%20e%20entrei%20em%20contato.)
- **E-mail:** [marcos.martirio@gmail.com](mailto:marcos.martirio@gmail.com)
- **LinkedIn:** [Marcos Santos Martirio](https://www.linkedin.com/in/marcos-santos-martirio-08075a123/)
- **GitHub:** [@mmartirio](https://github.com/mmartirio)
