import { render, screen } from '@testing-library/react';
import HeroImage from '../HeroImage';

it('should render hero image and have correct src', () => {
    render(<HeroImage src="test" />);

    screen.getByTestId('hero-image');
    expect(screen.getByTestId('hero-image').style.backgroundImage).toBe(
        'url(test)'
    );
});

