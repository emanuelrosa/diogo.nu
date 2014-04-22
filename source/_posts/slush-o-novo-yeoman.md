title: Slush, o novo Yeoman
date: 2014-04-21 17:03:41
tags:
- slush
- generator
- stylus
feature: /img/posts/2014/slush.jpg
---

Conheça o novo generator que utiliza Gulp para o scaffolding de seus projetos 

<!-- more -->

Ultimamente tem se falado muito em melhoras no workflow. Cada desenvolvedor tem o seu método de trabalhar. Mas todos possuem algo em comum: acham um saco ter que copiar os arquivos de um lado para o outro para ter que criar um novo projeto. É neste momento que entram os *generators*.

## Yeoman e Boilerplates

Foi pensando nisso que nos últimos anos (2˜3) passaram a surgir vários *boilerplates* e *generators*, esse ultimo mais especificamente utilizando o [Yeoman](http://yeoman.io/). Sim, nossa vida melhorou muito. Cada projeto que iniciamos sempre possui uma estrutura inicial padrão, e agora você não precisa mais copiar e colar arquivos de um lado para o outro.

Se você ainda não conhece o [Yeoman](http://yeoman.io/), ele é uma stack client-side feito em NodeJS que permite que você crie *generators* de várias aplicações web, utilizando as mais diversas tecnologias. Atualmente a comunidade já criou [quase 700 generators](http://yeoman.io/community-generators.html), além dos [official generators](http://yeoman.io/official-generators.html) e também dos que não aparecem em nenhumas dessas listas.

O [Yeoman](http://yeoman.io/) utiliza do [Grunt](http://gruntjs.com/) para fazer o scaffolding e do [Bower](http://bower.io/) para baixar as dependências dos projetos.

Apesar dos muitos *generators*, criar um generator exige muito cuidado, além de ler um pouco a documentação do Yeoman.

Com o surgimento do [GulpJS](http://gulpjs.com/), um *task runner*, assim como o Grunt, foi criado o [Slush](http://klei.github.io/slush/#/), um generator que utiliza o Gulp, ao invés do Grunt, além de ter um proposta mais simples.

## Começando com o Slush

O [Slush](http://klei.github.io/slush/#/) depende apenas do [GulpJS](http://gulpjs.com/) e de [seus plugins](http://gulpjs.com/plugins/). Para quem já mexeu com o Gulp, não terá muita dificuldade. Se você ainda não mexeu com o Gulp, aconselho o artigo do **Leonardo Souza**, [Bye bye Grunt.js, hello Gulp.js!](http://blog.caelum.com.br/bye-bye-grunt-js-hello-gulp-js/).

### Instalando o Slush

Para instalar o Slush, basta ter o [NodeJS](http://nodejs.org/) instalado na sua máquina. Se você já tem, basta instalar o Slush de modo global:

```bash
$ [sudo] npm install -g slush
```

### Criando seu primeiro generator

Como exemplo, nosso projeto irá gerar um scaffolding para trabalhar com a [stack MEAN](http://code.tutsplus.com/tutorials/introduction-to-the-mean-stack--cms-19918).

### Criação do arquivo package.json

Então primeiro vamos criar um arquivo chamado **package.json**, parecido com esse:

```json
{
  "name": "slush-mean",
  "version": "0.1.0",
  "description": "Generate a simple web project using Wordpress",
  "main": "slushfile.js",
  "keywords": [
    "slushgenerator",
    "mean",
    "express",
    "mongo",
    "node",
    "angular"
  ],
  "dependencies": {
    "gulp": "~3.5.6",
    "gulp-template": "~0.1.1",
    "gulp-install": "~0.1.1",
    "gulp-conflict": "~0.1.1",
    "gulp-rename": "~1.2.0",
    "underscore.string": "~2.3.3",
    "inquirer": "~0.4.1"
  },
  "author": "Seu Nome",
  "license": "MIT"
}
```

Vale ressaltar três peças importantes nesse arquivo:

* No nosso **name** temos que usar o prefixo **slush-**. Por exemplo, se você quiser chamar seu gerador de **test**, no name deverá ficar **slush-test**.
* No **main** devemos colocar o **slushfile.js**, pois assim como o Grunt e o Gulp, o Slush utiliza um arquivo de configuração próprio. Além do mais, o **main** é utilizado pelo *npm* para executar esse arquivo quando o módulo for instalado (veremos isso a seguir).
* Nas **keywords** é importante o uso da palavra-chave **slushgenerator** para que seu gerador apareça na lista "oficial", lá no site do [Slush](http://klei.github.io/slush/#/).

### Instalar as dependências

Depois que o arquivo **package.json** foi criado, vamos instalar as dependências:

```bash
$ [sudo] npm install
```

### Criar arquivo slushfile.js

Vamos agora criar um arquivo chamado **slushfile.js** na raiz, junto com seu package.json. O arquivo explica-se por si só, mas depois dele vou colocar algumas observações:

```javascript
/*
 * slush-mean
 * https://github.com/seu-nome/slush-mean
 *
 * Copyright (c) 2014, Seu Nome
 * Licensed under the MIT license.
 */

'use strict';

var gulp     = require('gulp'),
    install  = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename   = require('gulp-rename'),
    _        = require('underscore.string'),
    inquirer = require('inquirer');


gulp.task('default', function(done) {

    //Answers
    var prompts = [{
        name: 'appName',
        message: 'What the name of project?'
    }, {
        name: 'appDescription',
        message: 'What the description?'
    }, {
        name: 'appVersion',
        message: 'What the version?',
        default: '0.1.0'
    }, {
        name: 'appAuthor',
        message: 'Name of author?'
    }, {
        name: 'appEmail',
        message: 'Author e-mail?'
    }];

    //Ask
    inquirer.prompt(prompts,
        function(answers) {
            if (!answers.appName) {
                return done();
            }
            answers.appNameSlug = _.slugify(answers.appName)
            answers.appAuthorSlug = _.slugify(answers.appAuthor)
            gulp.src(__dirname + '/templates/**')
                .pipe(template(answers))
                .pipe(rename(function(file) {
                    if (file.basename[0] === '_') {
                        file.basename = '.' + file.basename.slice(1);
                    }
                }))
                .pipe(conflict('./'))
                .pipe(gulp.dest('./'))
                .pipe(install())
                .on('end', function() {
                    done();
                });
        });
});
```

Alguns pontos a serem observados:

* Na linha onde tem **/templates/** **, é nessa pasta que irá ficar os arquivos a serem "extraidos"
* Note que nas perguntas, existe a opção de colocar uma resposta "default" quando o cara só der ENTER


### Criando os arquivos a serem gerados

Essa parte é simples. Coloque dentro da pasta **templates** tudo que irá ser extraído. E agora vem a parte boa. Quando você quiser colocar "printar" o valor de uma resposta, simplesmente coloque `<%= nomeDaVariavelResposta %>` nos arquivos.

Por exemplo, crie eum arquivo chamado `package.json` dentro da pasta `templates`:

```json
{
  "name": "<%= appNameSlug %>",
  "description": "<%= appDescription %>",
  "version": "<%= appVersion %>",
  "author": {
    "name": "<%= appAuthor %>",
    "url": "<%= appEmail %>"
  },
  ...
}
```

Quando o generator for utilizado, o Slush/Gulp nada mais irá fazer que extrair tudo que está na pasta **templates** para a raiz e deletar os arquivos que ali estavam (slushfile.js, package.json, ...).

### Estrutura de arquivos

```
slush-mean/
├── templates/
│   ├── gulpfile.js
│   ├── package.json
│   └── ...
├── slushfile.js
└── package.json
```

### Testando e Publicando no NPM

Para você testar seu gerador, utilize o comando `npm link .`, isso irá criar um *alias* no seu npm/node. Agora você já pode testar seu generator. Crie outra pasta fora dessa estrutura e rode o comando `slush mean`. Para publicar nos registros oficias do NPM, utilize o comando `npm publish`. Se tiver dúvidas de como publicar um módulo, consulte o próprio [site do NPM](https://www.npmjs.org/).

## Conclusão

Vimos que com apenas **dois** arquivos conseguimos construir um *generator like a Yeoman*, só que bem mais simples. Eu mesmo criei um generator que irei explicar em outro post como foi feito, bem como o modo de usar.

Esse artigo parte do princípio de que você já tenha alguma familiariada com Node, NPM, Task Runner, Terminal entre outras coisas.

Qualquer dúvida, fique a vontade para publicar seu comentário!