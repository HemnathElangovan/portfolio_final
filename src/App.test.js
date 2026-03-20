import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio hero content', () => {
  render(<App />);
  expect(screen.getByText(/Hemnath/i)).toBeInTheDocument();
  expect(screen.getAllByText(/Download Resume/i)[0]).toBeInTheDocument();
});
