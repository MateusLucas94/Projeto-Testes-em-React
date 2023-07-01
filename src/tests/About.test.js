import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste se a aplicação contém um conjunto fixo de links de navegação', () => {
  it('O primeiro link deve possuir o texto `Home`', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const paragrafo1 = 'This application simulates a Pokédex,';
    const paragrafo2 = ' a digital encyclopedia containing all Pokémons';
    const paragrafo = screen.getByText(paragrafo1 + paragrafo2);
    expect(paragrafo).toBeInTheDocument();
  });
  it('Teste se a aplicação é redirecionada para a página `Not Found`', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const headinglvl2 = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(headinglvl2).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const paragrafo1 = screen.getByText(/This application simulates a Pokédex/i);
    const paragrafo2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragrafo1).toBeInTheDocument();
    expect(paragrafo2).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const imagem = screen.getByAltText('Pokédex');
    expect(imagem).toBeInTheDocument();
    expect(imagem).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
