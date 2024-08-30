//Essa primeira linha foi utilizada para ter a parte de intelicencia (inteligênica) que é,
//quando passar o mouse sobre os comandos o que o comando estou usando e caminhos relativos
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    const THREE_SECONDS_IN_MS = 3000
    beforeEach(function () {
        cy.visit('./src/index.html')

    })

    it('verifica o título da aplicação', function () {
        cy.title().should('be.eq', 'Central de Atendimento ao Cliente TAT')

    })
    //Aula 02

    //Exercício extra 1
    it('preenche os campos obrigatórios e envia o formulário', function () {

        const longText = ('Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste,')
        cy.clock()

        cy.get('#firstName').type('Janete')
        cy.get('#lastName').type('Alves')
        cy.get('#email').type('alvesjanete638@gmail.com')
        //Passamos como segundo argumento além da string que a gente quer digitar o objeto de Options
        //com a propriedade delay e com o valor zero e ai o nosso teste roda mais rápido
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {

        cy.clock()
        cy.get('#firstName').type('Janete')
        cy.get('#lastName').type('Alves')
        cy.get('#email').type('alvesjanete638@gmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')
    })


    //Exercício extra 2
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {

        cy.clock()
        cy.get('#firstName').type('Janete')
        cy.get('#lastName').type('Alves')
        cy.get('#email').type('alvesjanete@exemplo,com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })

    //Exercício extra 3
    //Cypress._.times(3, function(){} esta executando esse caso de teste 3 vezes - aula 11
    Cypress._.times(3, function () {
        it('campo telefone continua vazio quando preenchido com valor não númerico', function () {
            cy.get('#phone')
                .type('abcdefghij')
                //validar se o valor é vazio
                .should('have.value', '')


        })
    })

    //Exercício extra 4
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.clock()
        cy.get('#firstName').type('Janete')
        cy.get('#lastName').type('Alves')
        cy.get('#email').type('alvesjanete638@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })

    //Exercício extra 5
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName').type('Janete')
            .should('have.value', 'Janete')
            .clear()
            .should('have.value', '')
        cy.get('#lastName').type('Alves')
            .should('have.value', 'Alves')
            .clear()
            .should('have.value', '')
        cy.get('#email').type('alvesjanete638@gmail.com')
            .should('have.value', 'alvesjanete638@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone').type('123456789')
            .should('have.value', '123456789')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area').type('Teste')
            .should('have.value', 'Teste')
            .clear()
            .should('have.value', '')

    })

    //Exercício extra 6
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.clock()
        cy.get('button[type="submit"]').click()
        cy.get('.error')
            .should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')

    })

    //Exercício extra 8
    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')
    })

    //Aula 03

    //Exercício
    it('seleciona um produto (YouTube) por seu texto', function () {
        //posso pegar o elemento do tipo select, ao invés do ID #, mas usamos o ID porque é um pouco mas especifico
        //cy.get('select')
        cy.get('#product')
            //Estou encadeando um .select
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    //Exercício extra 1
    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        const valor = 'mentoria'
        cy.get('#product')
            .select(valor)
            .should('have.value', valor)

        /**cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')**/
    })

    //Exercício extra 2
    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    //Aula 04
    //Execício
    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    //Execício extra
    it('marca cada tipo de atendimento', function () {
        //Fazemos um cy.get que retorna mais do que um elemento
        cy.get('input[type="radio"]')
            //Podemos fazer uma verificação intermediária para contar quantos tinham
            //length é o comprimento, quantidade
            .should('have.length', 3)
            //E depois podemos encadear o .each para passar por cada um dos elementos
            //O .each recebe uma função de call beck como argumento
            //e essa função recebe como argumento cada um dos elementos que foi retornando/selecionado pelo cy.get
            .each(function ($radio) {
                //E daí para cada uma das iterações usamos o cy.wrap para empacotar esses elementos
                //e poder mandar comandos do cypress como .check e should
                //marcamos o primeiro, segundo e terceiro 1 de cada vez
                cy.wrap($radio).check()
                //e depois verifica se ele foi marcado
                cy.wrap($radio).should('be.checked')

                //usamos o $ como se estivesse usando o JQuery do cypress
                //lembrando que o $radio é do input tipo radio.
            })


    })

    //Aula 05
    //Exercício
    it('marca ambos checkboxes, depois desmarca o último', function () {
        //pegout todos os inputs que tem o type="checkbox"
        cy.get('input[type="checkbox"]')
            //mandei um check para selecionar cada um deles
            .check()
            .should('be.checked')
            //usado para pegar o último checkbox
            .last()
            //esse comando é usado para desmarcar
            .uncheck()
            //verificar se ele não esta mais marcado
            .should('not.be.checked')

    })

    //Aula 06
    //Exercício
    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]')
            //verificar se não tem nenhum valor marcado, nenhum valor nesse input
            .should('not.have.value')
            //acessar a ./(pasta) cypress e depois selecionar o arquivo (/example.json)
            //dentro da subpasta /ixtures
            .selectFile('./cypress/fixtures/example.json')
            //posso usar o $file ou $input vai da certo do mesmo jeito
            .should(function ($input) {
                //colocando esse comando console.log($input); e depois inspecionar clicando no 
                //selectFile('./cypress/fixtures/example.json')
                //abrir o console clicar para abrir o elemento jQuery, depois clicar no elemenbto indice 0: input#file-upload
                //depois clicar no objeto files: FileList, 
                // e depois clicar para expandir o objetoo indice 0:File e pegar a informação que esta
                //dentro no name que é o nome do arquivo name:alguma coisa
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    //Execicio Extra 1
    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            //criamos um segundo argumento que é um objeto {} de optios com a opção de action e dentro dele
            //e o valor drag-drop, esse drag-drop é como se tivesse arrastando um arquivo para anexar
            //esse caminho é chamado de fixture './cypress/fixtures/example.json'
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    //Exercicio extra 2
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        //damos um alias para a fixtura e para isso usamos o ".as" que significa "como"
        //e depois dizemos que estamos dando o nome dela como sampleFile
        //ou seja estamos pegando a fixture example e estamos dando o nome para ela de sampleFile (arquivo)
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            //encadeamos o selectFile e ao invés de passar todo o caminho './cypress/fixtures/example.json'
            //usamos apenas o sampleFile
            //obs: quando criamos um alias eu tenho que passar um arroba e o nome do alias
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })

    //Aula 07
    //Exercicio
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        //aqui peguei o elemento ID privacy e depois peguei o a (âncora)  que estava dentro desse ID
        cy.get('#privacy a')
            //aqui fiz uma verificação, se tem o atributo targete com o valor blanck
            .should('have.attr', 'target', '_blank')

    })

    //Exercicio extra 1
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a')
            //o invoke é usado para remover a target para poder abrir a politica de privacidade 
            //na mesma página onde o cypress esta rodando ao invés de uma nova janela
            //isso porque o cypress não reconhece a outra aba, só reconhece a janela onde esta rodando o sistema
            .invoke('removeAttr', 'target')
            .click()
        //confirmando se contém o texto e depois validando
        cy.contains('Talking About Testing').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function () {
        cy.get('.success')
            .should('not.be.visible')
            //chama o invoke show e ele vai Invocar, exibir o elemento que esta escondido
            .invoke('show')
            //validar que esta visivel
            .should('be.visible')
            //E se contém a mensagem ...
            .and('contain', 'Mensagem enviada com sucesso.')
            //depois invoca  o hide para esconder o elemento
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')

    })

    it('preenche a area de texto usando o comando invoke', function(){
        //usamos o Cypress. _ (lodash).repeat para criar dentro da variavel longText um texto longo que vai ser um texto de 200 caracteres
        //onde ele vai ter  do zero aoo 9 repetinddo 20 vezes
        const longText = Cypress._.repeat('0123456789', 20)
        cy.get('#open-text-area')
        //vamos invocar o valor 'val' da area de texto '#open-text-area'e depois setar nesse valor 'val' o valor longo que definimos na vareavel longText
        .invoke('val', longText)
        .should('have.value', longText)
    })


})