# Testing Guide

## Prerequisites

1. Install required packages:
```bash
pip install pytest python-dotenv
```

2. Environment Setup
Create a `.env` file in the `backend` directory with the following variables:

```ini
# Polygon.io API (Required for market data)
POLYGON_API_KEY=your_polygon_key_here

# Alpaca Trading API (Required for trading execution)
ALPACA_API_KEY=your_alpaca_key_here
ALPACA_SECRET_KEY=your_alpaca_secret_here
ALPACA_BASE_URL=https://paper-api.alpaca.markets
```

> ⚠️ **Important**: 
> - Never commit your API keys to version control
> - Make sure to use paper trading URL for testing
> - Obtain API keys from:
>   - [Polygon.io Dashboard](https://polygon.io/dashboard)
>   - [Alpaca Dashboard](https://app.alpaca.markets/paper/dashboard/overview)

## Running Tests

### Run all tests
```bash
# From the project root
pytest backend/tests/ -v -s
```

### Run specific test files
```bash
# Run specific test file
pytest backend/tests/test_services_test.py -v -s

# Run specific test function
pytest backend/tests/test_services_test.py::test_backtest_strategy -v -s
```

### Test Options
- `-v`: Verbose output
- `-s`: Show print statements
- `-k "test_name"`: Run tests matching the name
- `--collect-only`: Show which tests would be run

## Troubleshooting

If you encounter environment variable issues:
1. Verify your `.env` file exists in the correct location
2. Check file permissions
3. Try reloading the environment:
   ```python
   from dotenv import load_dotenv
   load_dotenv(override=True)
   ```

For API connection issues:
1. Verify your API keys are valid
2. Check your internet connection
3. Ensure you're using the correct API endpoints

## Adding New Tests

When adding new tests:
1. Create test files with prefix `test_`
2. Use descriptive test function names
3. Add appropriate assertions
4. Include error handling
5. Document any special requirements
