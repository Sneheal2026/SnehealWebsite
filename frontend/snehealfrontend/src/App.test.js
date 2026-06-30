import { render, screen } from '@testing-library/react';
import Button from './components/Button';

test('renders button with label', () => {
  render(<Button>Download App</Button>);
  expect(screen.getByText(/Download App/i)).toBeInTheDocument();
});
