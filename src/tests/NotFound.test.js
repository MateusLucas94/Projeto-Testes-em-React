import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { NotFound } from '../components';

describe('Teste o componente `<NotFound.js />`', () => {
  it('Teste se página contém um `h2` com o texto `Page requested not found 😭`', () => {
    renderWithRouter(<NotFound />);
    const h2EncPokemon = screen.getByRole('heading', { level: 2 });
    expect(h2EncPokemon).toBeInTheDocument();
    expect(h2EncPokemon).toHaveTextContent('Page requested not found 😭');
  });
  it('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const altDaImagem = 'Pikachu crying because the page requested was not found';
    const imagem = screen.getByAltText(altDaImagem);
    expect(imagem).toBeInTheDocument();
    expect(imagem).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
