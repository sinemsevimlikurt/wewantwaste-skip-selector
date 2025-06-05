import { render, screen, fireEvent } from '@testing-library/react';
import ProgressSteps from './ProgressSteps';

describe('ProgressSteps Component', () => {
  test('renders all six steps', () => {
    render(<ProgressSteps currentStep={3} />);
    
    // Check if all step names are rendered
    expect(screen.getByText('Postcode')).toBeInTheDocument();
    expect(screen.getByText('Waste Type')).toBeInTheDocument();
    expect(screen.getByText('Select Skip')).toBeInTheDocument();
    expect(screen.getByText('Permit Check')).toBeInTheDocument();
    expect(screen.getByText('Choose Date')).toBeInTheDocument();
    expect(screen.getByText('Payment')).toBeInTheDocument();
  });

  test('marks steps as completed correctly', () => {
    render(<ProgressSteps currentStep={3} />);
    
    // Get all step icons (circles)
    const stepIcons = screen.getAllByRole('button', { hidden: true });
    
    // First two steps should be completed (green)
    expect(stepIcons[0]).toHaveClass('bg-emerald-600');
    expect(stepIcons[1]).toHaveClass('bg-emerald-600');
    
    // Current step (3) should also be green
    const currentStep = screen.getByLabelText('Go to Select Skip step');
    expect(currentStep).toHaveClass('bg-emerald-600');
    
    // Future steps should be gray
    const permitStep = screen.getByText('Permit Check').closest('div').querySelector('div');
    const dateStep = screen.getByText('Choose Date').closest('div').querySelector('div');
    const paymentStep = screen.getByText('Payment').closest('div').querySelector('div');
    
    expect(permitStep).toHaveClass('bg-gray-700');
    expect(dateStep).toHaveClass('bg-gray-700');
    expect(paymentStep).toHaveClass('bg-gray-700');
  });

  test('completed steps are clickable', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    render(<ProgressSteps currentStep={3} />);
    
    // Find the first step button (Postcode)
    const postcodeStep = screen.getByLabelText('Go to Postcode step');
    
    // Click on the completed step
    fireEvent.click(postcodeStep);
    
    // Check if click handler was called
    expect(consoleSpy).toHaveBeenCalledWith('Navigated to step 1');
    
    consoleSpy.mockRestore();
  });

  test('future steps are not clickable', () => {
    render(<ProgressSteps currentStep={3} />);
    
    // Future steps don't have buttons, they have divs
    const permitStep = screen.getByText('Permit Check').closest('div').querySelector('div');
    
    // Ensure it's not a button
    expect(permitStep.tagName).not.toBe('BUTTON');
  });

  test('connector line shows correct progress', () => {
    render(<ProgressSteps currentStep={3} />);
    
    // Find the green connector line
    const greenConnector = document.querySelector('.bg-emerald-600.h-0.5');
    
    // Check that it has a width style set (exact value will depend on implementation)
    expect(greenConnector).toHaveStyle({ width: expect.stringContaining('%') });
  });

  test('renders with different current step', () => {
    render(<ProgressSteps currentStep={5} />);
    
    // Check that more steps are completed
    const stepIcons = screen.getAllByRole('button', { hidden: true });
    expect(stepIcons.length).toBe(4); // Steps 1-4 should be buttons (completed)
    
    // Current step (5) should be green
    const dateStep = screen.getByText('Choose Date').closest('div').querySelector('div, button');
    expect(dateStep).toHaveClass('bg-emerald-600');
    
    // Only Payment step should be gray
    const paymentStep = screen.getByText('Payment').closest('div').querySelector('div');
    expect(paymentStep).toHaveClass('bg-gray-700');
  });

  test('has proper accessibility attributes', () => {
    render(<ProgressSteps currentStep={3} />);
    
    // Check for aria-current attribute on current step
    const currentStep = screen.getByLabelText('Go to Select Skip step');
    expect(currentStep).toHaveAttribute('aria-current', 'step');
    
    // Check that completed steps have aria-label
    const postcodeStep = screen.getByLabelText('Go to Postcode step');
    expect(postcodeStep).toHaveAttribute('aria-label', 'Go to Postcode step');
  });
});
