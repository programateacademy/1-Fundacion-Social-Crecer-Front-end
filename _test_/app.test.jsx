import React from 'react';
import { render, act } from '@testing-library/react';
import users from "../src/apis/index";
import Header from '../src/components/header/Header';


jest.mock('../apis/index'); // Mockeamos el módulo de la API

describe('Header', () => {
  const onLogoutMock = jest.fn();
  const tokenMock = 'token123';
  const userInfoMock = {
    name: 'Test User',
    role: 'superAdmin'
  };

  beforeEach(() => {
    // Limpiamos los mocks antes de cada test
    jest.clearAllMocks();
  });

  it('should render the component with user info', async () => {
    users.get.mockResolvedValueOnce({ data: { data: { user: userInfoMock } } });

    let component;

    await act(async () => {
      component = render(<Header onLogout={onLogoutMock} token={tokenMock} />);
    });

    expect(component.getByAltText('fundacionCrecer')).toBeInTheDocument();
    expect(component.getByText('Inicio')).toBeInTheDocument();
    expect(component.getByText('Funcionarios')).toBeInTheDocument();
    expect(component.getByText(userInfoMock.name)).toBeInTheDocument();
    expect(component.getByText(userInfoMock.role)).toBeInTheDocument();
    expect(component.getByLabelText('logOutButton')).toBeInTheDocument();
  });

  it('should call onLogout if token is not present', async () => {
    let component;

    await act(async () => {
      component = render(<Header onLogout={onLogoutMock} />);
    });

    expect(onLogoutMock).toHaveBeenCalled();
  });

  it('should render the component without the Funcionarios button if the user is not a super admin', async () => {
    const userWithoutFuncionariosMock = { ...userInfoMock, role: 'admin' };
    users.get.mockResolvedValueOnce({ data: { data: { user: userWithoutFuncionariosMock } } });

    let component;

    await act(async () => {
      component = render(<Header onLogout={onLogoutMock} token={tokenMock} />);
    });

    expect(component.getByAltText('fundacionCrecer')).toBeInTheDocument();
    expect(component.getByText('Inicio')).toBeInTheDocument();
    expect(component.queryByText('Funcionarios')).not.toBeInTheDocument();
    expect(component.getByText(userWithoutFuncionariosMock.name)).toBeInTheDocument();
    expect(component.getByText(userWithoutFuncionariosMock.role)).toBeInTheDocument();
    expect(component.getByLabelText('logOutButton')).toBeInTheDocument();
  });
});
