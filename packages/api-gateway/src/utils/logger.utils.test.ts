import { errorLogger } from './logger.utils';

describe('logger.utils', () => {
    describe('errorLogger', () => {
        it('should log error message', () => {
            jest.spyOn(console, 'error').mockImplementation();

            errorLogger('test');

            expect(console.error).toHaveBeenCalledWith('Error: test');
        });
    });
});

