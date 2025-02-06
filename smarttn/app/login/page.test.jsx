import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Login from "smarttn\app\login\page.jsx"; // Assicurati che il percorso sia corretto

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ role: 'user' })
  })
);



// Test per verificare il login con credenziali corrette
test('logs in successfully with valid credentials', async () => {
  render(<Login />);

  const usernameInput = screen.getByPlaceholderText('Username');
  const passwordInput = screen.getByPlaceholderText('Password');
  const submitButton = screen.getByText('Conferma');

  fireEvent.change(usernameInput, { target: { value: 'davide' } });
  fireEvent.change(passwordInput, { target: { value: 'davide12345' } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      'https://ingegneria-del-software-phcc.onrender.com/api/users/login',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ username: 'davide', password: 'davide12345' })
      })
    );
  });
});
