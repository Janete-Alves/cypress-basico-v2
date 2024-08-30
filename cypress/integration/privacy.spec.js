//Exercicio extra 1 da aula 11
//Vou chamar o Cypress
// . - ponto
// _ - anderline que é o lodash
// .times() - o times é uma função
//o ponto times (.times(5, function(){})) recebe como primeiro argumento que é a quantidade de vezes que a gente quer executar
// a função de callback que séria tudo que  esta dentro da function(){} que séria o nosso caso de teste o it
// e a função de callback vai ser o segundo argumento
Cypress._.times(5, function () {
 //Aula 7
//Exercicio extra 2
  it('testa a página da política de privacidade de forma independente', function () {
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
  })

})