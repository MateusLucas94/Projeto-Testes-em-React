import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste o componente `<Pokemon.js />`', () => {
  renderWithRouter(<App />);
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent('Pikachu');
    const tipo = screen.getByTestId('pokemon-type');
    expect(tipo).toHaveTextContent('Electric');
    const peso = screen.getByTestId('pokemon-weight');
    expect(peso).toHaveTextContent(/Average weight: 6.0 kg/);
    const imagem = screen.getByAltText('Pikachu sprite');
    expect(imagem).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Teste se o card do Pokémon indicado na Pokédex contém um link', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /details/ });
    userEvent.click(link);
    expect(history.location.pathname).toEqual('/pokemons/25');
  });
  it('Teste se o card do Pokémon indicado na Pokédex contém um link'
  + 'de navegação para exibir detalhes deste Pokémon.'
  + 'O link deve possuir a URL `/pokemons/<id>`, onde `<id>` é o id'
  + 'do Pokémon exibido', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    expect(history.location.pathname).toEqual('/pokemons/25');
  });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);
    const selecionarFavorito = screen.getByRole('checkbox');
    userEvent.click(selecionarFavorito);
    const favoritoMarcado = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoritoMarcado).toHaveAttribute('src', '/star-icon.svg');
  });
});
