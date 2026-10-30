# ArqTech

Site institucional de arquitetura desenvolvido para apresentar projetos, informações sobre a empresa e canais de contato. O projeto também possui uma área de edição para atualizar os projetos exibidos no site.

## Acesse o site

[**ArqTech — versão publicada**](https://arqtechh.vercel.app/index.html)

## Funcionalidades

- Página inicial com apresentação da ArqTech.
- Seção de projetos com imagens, títulos e descrições.
- Seção institucional e informações de contato.
- Links para redes sociais.
- Layout adaptável para dispositivos móveis.
- Área de login e painel para editar os projetos e gerenciar imagens.
- Armazenamento das alterações no navegador por meio do `localStorage`.

## Tecnologias utilizadas

- **HTML5** — estrutura das páginas.
- **CSS3** — estilos e responsividade.
- **JavaScript** — interações, navegação e edição dos projetos.
- **Font Awesome** — ícones.
- **Google Fonts** — fontes tipográficas.
- **Vercel** — publicação do site.

## Estrutura do projeto

```text
arqtech/
├── Arqtech/
│   ├── index.html       # Página principal
│   ├── index2.html      # Tela de login
│   ├── index3.html      # Painel de edição
│   ├── main.js          # Interações da página principal
│   ├── main2.js         # Lógica da tela de login
│   ├── main3.js         # Edição dos projetos e imagens
│   ├── style.css        # Estilos da página principal
│   ├── style2.css       # Estilos da tela de login
│   ├── style3.css       # Estilos do painel de edição
│   └── fundo2.jpg       # Imagem utilizada no projeto
└── README.md
```

## Como executar localmente

Como o projeto utiliza HTML, CSS e JavaScript, não é necessário instalar dependências.

1. Clone o repositório:

   ```bash
   git clone https://github.com/devdavifalcao/arqtech.git
   ```

2. Entre na pasta do projeto:

   ```bash
   cd arqtech/Arqtech
   ```

3. Abra o arquivo `index.html` no navegador.

   Se preferir, utilize a extensão **Live Server** no Visual Studio Code para executar o site durante o desenvolvimento.

## Observações

- As alterações feitas pelo painel são armazenadas no `localStorage` do navegador utilizado. Elas não são compartilhadas automaticamente entre dispositivos ou navegadores.
- O login atual é uma demonstração feita no front-end. Não utilize esse mecanismo para proteger informações reais ou disponibilizar acesso administrativo em produção.
- O site utiliza imagens, fontes e ícones carregados de serviços externos, que dependem de conexão com a internet.

## Autor

Desenvolvido por [Davi Falcão](https://github.com/devdavifalcao).
