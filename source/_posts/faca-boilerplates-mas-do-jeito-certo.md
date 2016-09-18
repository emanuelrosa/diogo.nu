title: Faça boilerplates, mas do jeito certo
date: 2016-09-18 18:26:11
tags: 
- javascript
- boilerplate
- github
categories: 
- open-source
color: f0f0f0
feature: 2016/my-boilerplate.png
---

Você provavelmente está fazendo seus boilerplates de forma não muito boa no github.

<!-- more -->

Nos últimos anos provavelmente o que se tem mais visto no [github](https://github.com) são boilerplates. Isso é muito bom, pois provavelmente você vai encontrar o que mais se adequa a sua necessidade. Mas como eles não atendem 100% o problema, você vai lá e... **cria o seu**!

Creio que as primeiras contribuições da maioria dos desenvolvedores foram boilerplates. E o problema está justamente ai. Não em criar seu próprio boilerplate, mas criar de um jeito não tão intuitivo e de fácil usabilidade.

<blockquote>
	Boilerplates precisam ser gerados, não clonados.
</blockquote>

### O "problema"

Muitos desenvolvedores criam seus boilerplates simplemente criando um repositório e colocando os arquivos lá dentro.

Vamos contar uma historinha rápida: O **José** quer fazer um projetinho usando react e webpack. Nosso amigo **José**, navegando no github, acha um boilerplate do **Pedro** que usa essas tecnologias, bem próximo do jeito que ele precisa.

Clonando esse repositório simples, **José** terá alguns problemas, entre eles:

* Histórico de commits (eu sei que dá pra clonar usando `--depth 1`)
* Terá que excluir a pasta `.git` para retirar as referências remote
* José terá que trocar metadados em vários arquivos (como package.json e readme.md)
* Se ele quiser trocar alguma tecnologia como pré-processador css, ele terá que fazer várias mudanças e instalações
* Não é intuitivo e escalável, já que o usuário terá que fazer os mesmos procedimentos burocráticos na próxima vez

A única vantagem é apenas para o criador do boilerplate, já que a manutenção é mais fácil comparada a algum generator.

### O melhor jeito

A resposta é uma só: **Scaffolding Generators** ou apenas **Generators**. Sim, eles não são novidades para ninguém, porém a maioria os descarta pelo simples fato de não ser tão rápido criar boilerplates com eles.

Temos algumas opções open-source, mas vou citar três:

* [Yeoman](http://yeoman.io)
* [Slush](http://slushjs.github.io)
* CLI (Por exemplo, o [Create React App](https://github.com/facebookincubator/create-react-app))

Concordo que além de não ser tão rápido criar boilerplates usando generators, eles muitas vezes envolvem um conhecimento a mais de JavaScript e também porque é um pouco chato testar.

Dentre as milhares de vantagens dos generators, ressalto algumas:

* Sistema de perguntas para gerar a aplicação (usuário pode responder por exemplo Nome do Projeto, Pré-Processador CSS...)
* Para gerar o scaffolding basta rodar um comando
* Possuem sub-generators (como por exemplo gerar um componente react)
* Seu boilerplate fica na lista de generators (no caso do Slush e Yeoman)

### Conclusão

Não, eu não tive experiência ruim clonando repositórios, até porque sempre fui fã de generators, seja usando ou criando.

Também não estou dizendo que boilerplates em repositórios é ruim. Inclusive, se você já tem algum, deixe ele lá bonitinho =]

Mas quando for fazer seu próximo boilerplate, pense duas vezes antes de deixá-lo largado em um simples repositório.
