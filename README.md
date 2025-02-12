# 🔄 Unit Converter

A modern, fast, and user-friendly unit conversion web application built with Next.js 13, TypeScript, and Tailwind CSS.

![Unit Converter](public/preview.png)

## ✨ Features

- 🎯 **Accurate Conversions** - Precise conversion factors for multiple measurement types
- 🚀 **Real-time Results** - Instant conversions without page reloads
- 💾 **Caching System** - Redis-powered caching for improved performance
- 🌓 **Dark Mode** - Elegant dark mode support for comfortable viewing
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ⚡ **Fast & Modern** - Built with Next.js 13 App Router and React Server Components

## 🔧 Supported Conversions

- 📏 **Length** - Meters, Kilometers, Miles, Feet, Inches, etc.
- ⚖️ **Mass** - Kilograms, Pounds, Ounces, Grams, etc.
- 🌡️ **Temperature** - Celsius, Fahrenheit, Kelvin
- 📦 **Volume** - Liters, Gallons, Cubic Meters, etc.
- ⏰ **Time** - Seconds, Minutes, Hours, Days, Weeks

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/bishwajeet05/CC.git
   cd CC
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Redis URL
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 🛠️ Built With

- [Next.js 13](https://nextjs.org/) - The React Framework
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Redis](https://redis.io/) - Caching
- [Heroicons](https://heroicons.com/) - Icons

## 📝 API Usage

Convert units using the REST API:

```bash
curl -X POST http://localhost:3000/api/convert \
  -H "Content-Type: application/json" \
  -d '{
    "value": 100,
    "from": "kilometers",
    "to": "miles",
    "category": "length"
  }'
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Redis Documentation](https://redis.io/docs)

---

Made with ❤️ by [Bishwajeet](https://github.com/bishwajeet05) 