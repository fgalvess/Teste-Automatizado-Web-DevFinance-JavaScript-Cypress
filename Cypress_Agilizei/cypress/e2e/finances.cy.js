describe('Transações', () => {

    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app/#')
    });
    
    it('Cadastrar uma entrada', () => {
        preencherTransacao("Saldo das Bet :P", 350, "2023-05-01")
        cy.get('tbody tr td.description').should("have.text", "Saldo das Bet :P")
    });

    it('Cadastrar uma saída', () => {
        preencherTransacao('Cinema', -80, '2023-05-02')
        cy.get('tbody tr td.description').should('have.text', 'Cinema')
    });

    it('Excluir transação', () => {
        preencherTransacao('Freela', 150, '2023-05-01')
        preencherTransacao('Segundo Freela', 250, '2023-05-01')

        cy.contains('.description', 'Freela')
          .parent()
          .find("img")
          .click()
        cy.get('tbody tr').should('have.length', 1)  
        cy.get('.total').should('contain','250,00') 
    });
});

function preencherTransacao(descricao, valor, data){
    cy.get('#transaction > .button').click()
    cy.get('#description').type(descricao)
    cy.get('#amount').type(valor)
    cy.get('#date').type(data)
    cy.get('button').click()
}