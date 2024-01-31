import { render, screen } from '@testing-library/react';
import ErrorNotice from '../ErrorNotice';

it('should render ErrorNotice and show text correctly', () => {
    render(<ErrorNotice />);
    screen.getByText('Opps! Something went wrong.');

    expect(screen.getByText('Opps! Something went wrong.').textContent).toBe(
        'Opps! Something went wrong.'
    );
});

