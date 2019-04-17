describe('Play button', () => {
  const sel = '.aip-controls-btn-play';

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('exists and is visible', () => {
    cy.get(sel)
      .should('be.visible')
      .and('have.attr', 'type', 'button');
  });

  it('has assistive text instead of aria-label', () => {
    cy.get(sel).should('not.have.attr', 'aria-label');

    cy.get(sel)
      .children('.assistive-text')
      .should('have.length', 1)
      .and('not.be.empty');
  });

  it('has visible styles when focused', () => {
    cy.get(sel)
      .first()
      .focus();

    cy.get(sel)
      .should('have.class', 'focus-visible')
      .and('have.css', 'box-shadow');
  });
});
