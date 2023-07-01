import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste o componente `<Pokedex.js />', () => {
  it('Teste se página contém um heading `h2` com o texto `Encountered pokémons`', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const h2EncPokemon = screen.getByRole('heading', { level: 2 });
    expect(h2EncPokemon).toBeInTheDocument();
    expect(h2EncPokemon).toHaveTextContent('Encountered pokémons');
  });
  it('Teste se é exibido o próximo Pokémon da lista', () => {
    renderWithRouter(<App />);
    const proximoPok = screen.getByTestId(/next-pokemon/i);
    userEvent.click(proximoPok);
    expect(proximoPok).toBeInTheDocument();
  });
  it('Teste se é mostrado apenas 1 pokemon por vez`', () => {
    renderWithRouter(<App />);
    const umPokemonPorVez = screen.getAllByTestId(/pokemon-name/i);
    expect(umPokemonPorVez).toHaveLength(1);
  });
  it('Teste se a Pokédex filtra cada tipo de pokemon', () => {
    renderWithRouter(<App />);
    const sete = 7;
    const nextPokemon = screen.getAllByTestId(/pokemon-type-button/i);
    expect(nextPokemon).toHaveLength(sete);
  });
  it('O texto do botão deve corresponder ao nome do tipo', () => {
    renderWithRouter(<App />);
    const typeButton = screen.getAllByTestId(/pokemon-type-button/i);
    const tipos = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    typeButton.forEach((tipoBotoes) => {
      console.log(tipoBotoes);
      const findType = tipos.find((tipoFound) => tipoFound === tipoBotoes.innerHTML);
      expect(findType).toBeDefined();
    });
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonReset = screen.getByRole('button', { name: 'All' });
    expect(buttonReset).toBeInTheDocument();
    userEvent.click(buttonReset);
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent('Pikachu');
  });
});
