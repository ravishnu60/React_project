import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('shows only four cars that can be reordered and checked', () => {
  render(<App />);
  const checkButton = screen.getByRole('button', { name: 'Check order' });
  const slots = screen.getAllByRole('button', { name: /^Order position/ });

  expect(slots).toHaveLength(4);
  expect(slots[0].getAttribute('style')).toContain('--car-tint');
  expect(slots[0].getAttribute('style')).toContain('--car-accent');
  expect(screen.queryByRole('button', { name: /Choose .* car/ })).not.toBeInTheDocument();
  expect(checkButton).toBeEnabled();

  const transferValues = {};
  const dataTransfer = {
    setData: (type, value) => { transferValues[type] = value; },
    getData: type => transferValues[type] || '',
    effectAllowed: ''
  };
  const firstColor = slots[0].getAttribute('aria-label').split(', ')[1];
  const secondColor = slots[1].getAttribute('aria-label').split(', ')[1];
  fireEvent.dragStart(slots[0], { dataTransfer });
  fireEvent.drop(slots[1], { dataTransfer });
  expect(screen.getByRole('button', { name: `Order position 1, ${secondColor}` })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: `Order position 2, ${firstColor}` })).toBeInTheDocument();

  fireEvent.click(checkButton);

  expect(screen.getByRole('heading', { name: 'Run 1' })).toBeInTheDocument();
  expect(document.querySelectorAll('.attempt-car')).toHaveLength(4);
  expect(document.querySelector('.attempt-car').getAttribute('style')).toContain('--car-tint');
  expect(screen.getAllByRole('button', { name: /^Order position/ })).toHaveLength(4);
});
