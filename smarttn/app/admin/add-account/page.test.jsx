import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AddUser from "smarttn\app\admin\add-account\page.jsx";
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Utente inserito nel database' })
  })
);


// Test per verificare che l'utente venga creato con successo
test('creates a user successfully', async () => {
  render(<AddUser />);

  const usernameInput = screen.getByPlaceholderText('Username');
  const passwordInput = screen.getByPlaceholderText('Password');
  const submitButton = screen.getByText('Aggiungi Utente');

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      'https://ingegneria-del-software-phcc.onrender.com/api/users',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ username: 'testuser', password: 'password123', role: 'user' })
      })
    );
  });
});

// Test per verificare che la creazione di un utente fallisca senza username
test('fails to create a user without a username', async () => {
  render(<AddUser />);

  const passwordInput = screen.getByPlaceholderText('Password');
  const submitButton = screen.getByText('Aggiungi Utente');

  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText("L'username e la password sono obbligatori")).toBeInTheDocument();
  });
});

// Test per verificare che la creazione di un utente fallisca senza password
test('fails to create a user without a password', async () => {
  render(<AddUser />);

  const usernameInput = screen.getByPlaceholderText('Username');
  const submitButton = screen.getByText('Aggiungi Utente');

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText("L'username e la password sono obbligatori")).toBeInTheDocument();
  });
});
