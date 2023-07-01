import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste o componente `<FavoritePokemons.js />', () => {
  it('Teste se é exibido na tela a mensagem `No favorite pokemon found`', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const mensagem = screen.getByText('No favorite pokemon found');
    expect(mensagem).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados`', () => {
    renderWithRouter(<App />);
    const cardFavorito = screen.getByRole('link', { name: 'More details' });
    userEvent.click(cardFavorito);
    const selecFavorito = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(selecFavorito);
    const linkFavoritos = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavoritos);
    screen.getByTestId('pokemon-name');
    screen.getByTestId('pokemon-type');
    screen.getByTestId('pokemon-weight');
  });
});
