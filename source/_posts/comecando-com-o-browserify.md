title: Começando com o Browserify
date: 2014-09-24 13:26:11
tags: 
- javascript
- browserify
- nodejs
categories: 
- tutorial
color: f0f0f0
feature: 2014/browserify.png
---

Saiba como começar com a modularizar seu código usando o Browserify

<!-- more -->

## Introdução

Ultimamente no "mundo front-endiano" tem se falado muito em modularização, principalmente em CSS e JS. Mais particularmente em JS, muito se fala em componentes, onde podemos usa-los sozinhos ou como um todo, bem como, com alguns parâmetros, modificar esses componentes já existentes.

Muitos de nós tem feito isso ultimamente utilizando o padrão de [Módulos AMD](http://requirejs.org/docs/whyamd.html) e usando o [RequireJS](http://requirejs.org) para fazer isso.

No último ano, o [Browserify](http://browserify.org/) ganhou muita força, fazendo com que muitos desenvolvedores que já trabalhavam (ou até mesmo os que não trabalhavam) com NodeJS, passassem a utilizar ele para modularizar seus códigos.

## Afinal, o que é o Browserify?

O [Browserify](http://browserify.org/) nos permite usar o padrão de módulos do NodeJS no navegador. Nós definimos as dependências e depois o Browserify empacota tudo isso em apenas um arquivo JS, limpo e estruturado. Você inclui os arquivos necessários usando `require('./seuArquivo.js')` e também módulos publicados no [NPM](https://www.npmjs.org/). O Browserify também gera *source maps* para você depurar os arquivos JS individualmente, apesar de estarem em um arquivo só.

## Por que usar módulos do Node?

Importação de módulos é uma mão-na-roda. Ao invés de visitar uma série de sites para baixar as dependências do seu projeto, você pode fazer isso apenas usando `require()`. Bibliotecas JS como [jQuery](https://www.npmjs.org/package/jquery/), [Backbone](https://www.npmjs.org/package/backbone), [Underscore](https://www.npmjs.org/package/underscore) e até [Angular](https://www.npmjs.org/package/angular/) (apesar de não ser um módulo oficial) estão  disponíveis no NPM. Além do mais, se você já está trabalhando em um site que já roda em Node, você estará simplificando as coisas, pois já terá uma maneira comum de estruturar todos os seus JS.

## O que você precisa para começar?

Para começar com o Browserify, você precisa ter:

* [NodeJS](http://nodejs.org) e o [NPM](https://www.npmjs.org/) (o NPM já vem junto com o Node =])
* [Browserify](http://browserify.org/)
* Alguns módulos seus ou de terceiros (NPM)

## Começando...

Para começar, precisamos ter o Browserify instalado globalmente na sua máquina, simplesmente digite:

```bash
$ [sudo] npm install -g browserify
```

## Criando seu primeiro projeto

Para um primeiro projeto teste, vamos começar importando uma biblioteca muito popular, o [Underscore](https://www.npmjs.org/package/underscore). Vamos usar essa *lib* para encontrar **o campeão da Copa do Mundo de 2014**. Vamos chamar esse arquivo de `worldCup.js` e colocar ele na pasta `js` do nosso projeto.

Nós começamos designando a variável `_` para o Underscore, usando o `require()`.

```js
var _ = require('underscore');
```

Agora usando as funções `each()` e o `find()` do Underscore, vamos buscar em dois *arrays* e mostrar através do `console.log()` para saber se encontramos a seleção campeã da Copa do Mundo de 2014 na lista de seleções. Nosso código javascript será parecido com este:

```js worldCup.js
var _ = require('underscore');

var teams = ['Brasil', 'Holanda', 'Argentina', 'Alemanha', 'Espanha'],
    othersTeams = ['Inglaterra', 'Uruguai', 'México', 'França', 'Chile'];
 
_.each([teams, othersTeams], function(team) {
    findChampion(team);
});
 
function findChampion(values) {
    _.find(values, function(championTeam) {
        if (championTeam === 'Alemanha') {
            console.log('Esta é a seleção campeã');
        } else {
            console.log('Esta não é seleção campeã :(');
        }
    });
}
```

Se você já trabalha/trabalhou com NodeJS sabe que cada dependência deve ser instalada e/ou *setada* no arquivo `package.json`. Então, como vamos usar a biblioteca Underscore, devemos instalar a mesma no nosso projeto e incluí-la na lista de dependências:

```bash
$ [sudo] npm install underscore --save
```
Fazendo isso, você está dizendo que seu projeto depende do Underscore. Todo módulo instalado pelo npm fica na pasta `node_modules`.

### Rodando pela primeira vez o Browserify

Agora vamos rodar o Browserify no nosso projeto. Toda vez que o Browserify é executado ele gera um novo arquivo `.js`. Neste nosso caso, ele irá gerar um único arquivo **.js**, onde esse terá o Underscore juntamente como nosso código. Sabendo disso, rode este comando no seu terminal:

```bash
$ browserify js/worldCup.js -o js/main.js -d
```

Isso irá gerar um novo arquivo chamado **main.js**, este definido pelo parâmetro `-o`. Veja que também passamos o parâmetro `-d` para gerar *source maps*, onde assim podemos inspecionar possíveis erros no Underscore ou no nosso código. *Source Maps* são muito comuns em pré-processadores css e js, mas não é uma boa prática usá-los em produção.

### Usando o arquivo de saída

Depois que ele gerou o arquivo **main.js**, agora é só chama-lo no nosso arquivo html:

```html
<script src="js/main.js"></script>
```

### Importando seus arquivos JS

Provavelmente sua aplicação não terá somente módulos do node. Para incluir seu próprio arquivo JS é só usar no `require()` normalmente. A linha a seguir mostra como importar seu arquivo js chamado `meu_modulo.js` e guarda-lo na variável `meuModulo`:

```javascript
meuModulo = require('./meu_modulo.js');
```

Para importar nosso arquivo JS como um módulo precisamos estrutura-lo como tal, usando `module.exports`, assim:

```javascript meu_modulo.js
module.exports = function(vars) {
    // Seu código JS aqui
}
```

## Exemplo da Copa do Mundo

Para dar um toque de complexidade, vamos colocar nosso arquivo que busca o campeão da copa do mundo em um módulo. Desta maneira, podemos achar/recuperar o campeão do mundo em qualquer parte do nosso código JS, bastando apenas chamar a função.

Para isso, nós vamos colocar nosso código dentro do arquivo `findChampionWorldCup.js` usando `module.exports`:

```javascript findChampionWorldCup.js
module.exports = function (values) {

    findChampion = false;
 
    _.find(values, function(championTeam) {
        if (championTeam === 'Alemanha') {
            console.log('Esta é a seleção campeã');
            findChampion = true;
        } else {
            console.log('Esta não é seleção campeã :(');
        }
    });

    return findChampion;

}
```

Nós adicionamos um `return` no nosso módulo. Se o script achar o campeão, ele retorna `true`, se não, retorna `false`. Note que este módulo usa o Underscore, mas nós não importamos ele. Se você quiser importar somente neste módulo é só chamar via `require()` acima do seu código:

```javascript
var _ = require('underscore');
 
module.exports = function (values) {
    // Seu código
}
```

Acontece que quando usamos o Browserify ele vasculha todos os seus arquivos JS e ver quais importações tem (`require()`), para assim, compilar essa importação apenas uma vez.

Mas a boas práticas nos sugere então chamar todas as bibliotecas e dependências no arquivo principal, ficando assim nosso arquivo JS:

```javascript app.js
var _ = require('underscore'),
    teams = require('./teams.js'),
    findChampion = require('./findChampionWorldCup.js');
 
if (findChampion(teams())) {
    document.write('Achamos o campeão!');
} else {
    document.write('Não achamos o campeão :(');
}
```

**Atenção:** Usamos `document.write` apenas para fins de exemplo. Não é uma boa prática utilizar esse método. Agora sim, o arquivo que contém as seleções:

```js teams.js
module.exports = function() {
    return ['Brasil', 'Holanda', 'Argentina', 'Alemanha', 'Espanha', 'Inglaterra', 'Uruguai', 'México', 'França', 'Chile'];
}
```

Note que nosso arquivo que contém o nome das seleções (`teams.js`) está sendo chamado como um módulo e possui um `return`, por isso precisamos chamar como função.

Nossa estrutura ficou a seguinte:

```
├── js
|   ├── app.js
|   ├── findChampionWorldCup.js
|   └── teams.js
└── index.html
```

Agora vamos rodar o comando `browserify` novamente, só que agora diferente:

```bash
browserify js/app.js -o js/main.js -d
```

Na nossa pasta JS terá um arquivo a mais:

```
├── js
|   ├── app.js
|   ├── findChampionWorldCup.js
|   ├── main.js (arquivo gerado pelo browserify)
|   └── teams.js
└── index.html
```

Só pra ficar claro que nosso arquivo `index.html` é o mais simples possível:

```html index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Browserify Project</title>
</head>
<body>
    <script src="js/main.js"></script>
</body>
</html>
```

Agora abra esse arquivo `index.html` no browser, provavelmente terá algo parecido com isso:
![Previa Browserfiy](/img/posts/2014/browserify-01.jpg)

E se você checar o console, terá algo como:

![Previa Browserfiy](/img/posts/2014/browserify-02.jpg)

### Browserify como dependência no `package.json`

Digamos que você precisa tornar esse projeto público ou tem mais gente que precisa mexer nele. Precisamos incluir o Browserify como dependência no processo de desenvolvimento:

```json
{
  "name": "browserify-example",
  "version": "0.1.0",
  "description": "A simple browserify project",
  "author": "Diogo Moretti",
  "license": "MIT",
  "dependencies": {
    "underscore": "~1.6.0"
  },
  "devDependencies": {
    "browserify": "latest"
  }
}
```

Nosso projeto possui o Underscore como dependência e o Browserify como dependência no desenvolvimento. Colocamos a versão do Browserify como `latest`, mas se você preferir pode usar `*` que é a mesma coisa. Ambos instalar a última versão do módulo.

## Conclusão

Ainda é cedo para dizer se o Browserify é a melhor opção para modularizar seus arquivos JS. Mas vale muito a pena testar, principalmente se a aplicação já usa node no back-end ou no front-end, ou nos dois :)

Arquivos de exemplo no meu github:

<a href="https://github.com/diogomoretti/browserify-example" class="btn btn-primary"><i class="fa fa-white fa-github"></i> Browserify example</a>

<div class="translation-note"><p>Este artigo é uma versão traduzida de <a href="http://www.sitepoint.com/getting-started-browserify/" target="_blank">Getting Started with Browserify</a> com a devida permissão do autor <a href="https://twitter.com/thatpatrickguy" target="_blank">Patrick Catanzariti</a> e do <a href="http://www.sitepoint.com" target="_blank">SitePoint</a>. Alguns exemplos e trechos do texto foram alterados para fazer sentido ao público-alvo.</p></div>