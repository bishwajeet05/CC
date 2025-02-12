# Modern Unit Converter

A next-generation unit conversion web application built with Next.js, React, and Tailwind CSS. This project provides a modern, intuitive interface for converting between different units of measurement.

## Features

- 🚀 Fast, real-time unit conversions
- 🎨 Modern, responsive UI with dark mode support
- 📱 Mobile-friendly design
- ⚡ Instant search functionality
- 🔄 Multiple conversion categories
- 🌐 SEO optimized

## Tech Stack

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Headless UI
- Heroicons

## Getting Started

1. **Clone the repository**

```bash
git clone <repository-url>
cd unit-converter
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Conversions

- Length (meters to feet, etc.)
- Weight (kilograms to pounds, etc.)
- Temperature (celsius to fahrenheit, etc.)
- Speed (km/h to mph, etc.)

## Project Structure

```
unit-converter/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── convert/
│   │   │   └── [category]/
│   │   │   └── [unit1]-to-[unit2]/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── Converter.tsx
│       ├── Navigation.tsx
│       └── ThemeToggle.tsx
├── public/
└── package.json
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
