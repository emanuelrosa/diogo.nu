title: SGS - Stylus Grid System
date: 2014-03-31 22:03:21
tags: 
- html5
- css
- stylus
- grid
categories: 
- project
- open-source
layout: post
feature: /img/posts/2014/sgs.jpg
---

Hoje em dia existem muitos sistemas de grid. Mas cada um tem sempre alguma coisa que não gostamos.

<!-- more -->

Por isso resolvi criar meu próprio sistema de grid, escrito em [Stylus](http://learnboost.github.io/stylus/), meu pré-processador css favorito. Fiz ele todo fluído (não possui largura fixa) e também fiz opção de ser semântico ou não.

## Semântico x Não-Semântico

Essa discussão gera muitos comentários nas comunidades front-end. Para quem não sabe, o **grid não-semântico** é aquele que utiliza classe no html para criar o grid, por exemplo classes como span1, column3, grid2. Já o **grid semântico** é aquele que deixa a formatação do grid para o css, por exemplo: você põe uma classe chamada "sidebar", e lá no css coloca as propriedades do grid dentro de ".sidebar".

Eu particularmente gosto muito de **grids semânticos**, pois concentro toda minha lógica no css. A questão de semântica não fica apenas em grid, na verdade ela é em todo o documento. Um HTML semântico não possui classes do tipo "box-right" ou "button-red". Para uma boa escrita semântica, devemos colocar a **função** do elemento, e não sua posição ou cor, por exemplo.

O assunto de semântica se estende também para o coreto uso das tags, acessibilidade com [WAI-ARIA](http://www.w3.org/WAI/intro/aria) e [Schema.org](https://schema.org/). Mas isso fica para um próximo post.

## Sistemas de grid

Desde que sistemas de grid começaram a surgir, por volta de 2008, sempre utilizei. Utilizava na época o [Blueprint](http://www.blueprintcss.org/). Ele não é semântico, mas na época colocar duas colunas lado a lado com apenas uma classe era coisa de outro mundo.

Todos os grids utilizavam o sistema não-semântico até a chegada dos pré-processadores css, em 2011. E assim se deu um boom de sistemas de grid na internet, cada um com sua peculiaridade.

Hoje em dia você até se perde na hora de escolher um grid. Mas não adianta, mesmo aquele que mais te agradou sempre terá algo que você gostaria de melhorar ou até mesmo adicionar novas *features*. Por querer adicionar essas features, 90% dos grids hoje são feitos com algo pré-processador e claro, de código open-source no [Github](https://github.com).

Como quase todo mundo utiliza pré-processador css, cada um escolhe o sistema de grid baseado na sua "língua". Seja em [Stylus](http://learnboost.github.io/stylus/), [Sass](http://sass-lang.com/), [Less](http://lesscss.org/) ou até mesmo em [Roole](http://roole.org/).

Foi com base na "língua" que a muito tempo venho utilizando o [Semantic.gs](http://semantic.gs), na sua versão para o Stylus. Mas algumas coisas vinham me incomodando, além de não ter muitas variáveis de configuração. Foi adicionando algumas *features* que quando eu vi, eu estava com um sistema de grid bem diferente (nem tanto, pois o "make-grid" é o mesmo) do *default* do Semantic.gs.

## SGS

O **SGS** é um *fork* do Semantic.gs, com várias variáveis de configuração e algumas outras features. Fiz um pequeno hotsite e assim como o grid, a documentação estará em constante desenvolvimento. Abaixo você pode acessar o site e conferir esse grid.

Ahh, encontrou algum erro ou quer colaborar com novas funcionalidades? Dê um *fork*, *pull request* ou abra uma issue no Gitihub.

<a href="http://diogomoretti.github.io/sgs/" class="btn btn-info"><i class="fa fa-share"></i>SGS - Stylus Grid System</a>