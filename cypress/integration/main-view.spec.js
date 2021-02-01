//escribe al menos 3 tests de cypress propios, que prueben nuestra aplicación angular

// revisa que tiene encabezado correcto y en español por defecto
describe('ventana principal', () => {
  it('tiene encabezado correcto y en español por defecto', () => {
    cy.visit('http://localhost:4200');
    cy.contains('whishlist');
    cy.get('h1 b').should('contain', 'Hola es');
  });
});

// revisa que tiene encabezado correcto y en español por defecto
describe();

// revisa que tiene encabezado correcto y en español por defecto
describe();