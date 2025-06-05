import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import SkipSizeSelection from './SkipSizeSelection';

// Mock API response data
const mockSkips = [
  {
    id: 1,
    size: 4,
    price: 220.00,
    dimensions: '1.8m x 1.5m x 1.2m',
    capacity: '45 bags',
    hire_period_days: 14,
    description: 'Ideal for small home projects and garden waste',
    image_url: 'https://example.com/4yard.jpg'
  },
  {
    id: 2,
    size: 6,
    price: 250.00,
    dimensions: '2.1m x 1.5m x 1.2m',
    capacity: '65 bags',
    hire_period_days: 14,
    description: 'Perfect for medium renovation projects',
    image_url: 'https://example.com/6yard.jpg'
  }
];

// Set up MSW server to intercept API requests
const server = setupServer(
  rest.get('https://app.wewantwaste.co.uk/api/skips/by-location', (req, res, ctx) => {
    return res(ctx.json(mockSkips));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('SkipSizeSelection Component', () => {
  test('displays loading state initially', () => {
    render(<SkipSizeSelection />);
    expect(screen.getByText(/loading skip options/i)).toBeInTheDocument();
  });

  test('renders skip cards after successful API call', async () => {
    render(<SkipSizeSelection />);
    
    // Wait for loading to finish and skips to be displayed
    await waitFor(() => {
      expect(screen.queryByText(/loading skip options/i)).not.toBeInTheDocument();
    });
    
    // Check if skip cards are rendered
    expect(screen.getByText('4 Yard Skip')).toBeInTheDocument();
    expect(screen.getByText('6 Yard Skip')).toBeInTheDocument();
    expect(screen.getByText('14 day hire period')).toBeInTheDocument();
    expect(screen.getByText('Ideal for small home projects and garden waste')).toBeInTheDocument();
  });

  test('displays error message when API call fails', async () => {
    // Override the default handler to return an error
    server.use(
      rest.get('https://app.wewantwaste.co.uk/api/skips/by-location', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Server error' }));
      })
    );
    
    render(<SkipSizeSelection />);
    
    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText(/failed to fetch skip data/i)).toBeInTheDocument();
    });
  });

  test('formats price correctly', async () => {
    render(<SkipSizeSelection />);
    
    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText(/loading skip options/i)).not.toBeInTheDocument();
    });
    
    // Check if prices are formatted correctly
    expect(screen.getByText('£220.00')).toBeInTheDocument();
    expect(screen.getByText('£250.00')).toBeInTheDocument();
  });

  test('displays placeholder image when image_url is missing', async () => {
    // Override the default handler to return skips with missing image_url
    server.use(
      rest.get('https://app.wewantwaste.co.uk/api/skips/by-location', (req, res, ctx) => {
        return res(ctx.json([
          {
            ...mockSkips[0],
            image_url: null
          }
        ]));
      })
    );
    
    render(<SkipSizeSelection />);
    
    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText(/loading skip options/i)).not.toBeInTheDocument();
    });
    
    // Check if placeholder image is used
    const image = screen.getByAltText('4 Yard Skip - Visual representation');
    expect(image.src).toContain('placehold.co');
  });
});
