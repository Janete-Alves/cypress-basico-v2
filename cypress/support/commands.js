//Cypress.Commands.add, significa (Quero adicionar um novo comando ao cypress)
//fillMandatoryFieldsAndSubmit, quer dizer: preencha os campos obrigatorios e submete
//function(){} de call back, que vai executar os passos que fazem o que o nome do mando diz, que é:
// preenche os campos obrigatórios e submete

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Janete')
    cy.get('#lastName').type('Alves')
    cy.get('#email').type('alvesjanete638@gmail.com')
    cy.get('#open-text-area').type('Teste')
    //Exercício extra 7
    cy.contains('button', 'Enviar').click()
})
