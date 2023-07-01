import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('1. Teste se o topo da aplicação contém um conjunto fixo de links', () => {
  it('O primeiro link deve possuir o texto `Home`', () => {
    renderWithRouter(<App />);
    const link = screen.getByText('Home');
    expect(link).toBeInTheDocument();
  });
  it('O primeiro link deve possuir o texto `About`', () => {
    renderWithRouter(<App />);
    const link = screen.getByText('About');
    expect(link).toBeInTheDocument();
  });
  it('O primeiro link deve possuir o texto `Favorite Pokémons`', () => {
    renderWithRouter(<App />);
    const link = screen.getByText('Favorite Pokémons');
    expect(link).toBeInTheDocument();
  });
  it('- Teste se a aplicação é redirecionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByText('Home');
    userEvent.click(link);
    expect(history.location.pathname).toBe('/');
  });
  it('Teste se a aplicação é redirecionada para a página de `About`,', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByText('About');
    userEvent.click(link);
    expect(history.location.pathname).toBe('/about');
  });
  it('Test se a aplicação é redirecionada para a página de `Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByText('Favorite Pokémons');
    userEvent.click(link);
    expect(history.location.pathname).toBe('/favorites');
  });
  it('Teste se a aplicação é redirecionada para a página `Not Found`', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/algumaCoisaDiferente');
    const notFound = screen.getByRole('heading', { level: 2 });
    expect(notFound).toBeInTheDocument();
    expect(notFound).toHaveTextContent('Page requested not found');
  });
});
