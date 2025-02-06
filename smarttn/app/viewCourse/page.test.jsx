import CoursesListPage from '@/components/Courses_list';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

// Test per verificare che la pagina venga renderizzata correttamente
test('renders the CoursesListPage correctly', async () => {
  render(<CoursesListPage />);
  
  const headingElement = await screen.findByText('Elenco dei corsi');
  expect(headingElement).toBeInTheDocument();
});
