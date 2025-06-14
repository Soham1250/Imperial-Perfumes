/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        blck: {
          purple: "#1E0A23",
          darkPurple: "#150719",
          silver: "#D0D0D0",
          text: "#FFFFFF",
          textMuted: "#A0A0A0",
          button: "#D0D0D0",
          buttonText: "#1E0A23",
          accent: "#8A2BE2",
          accentLight: "#9D4EFF",
          card: "#2D1133",
          cardLight: "#3D1A45",
          gold: "#D4AF37",
          lightOrange: "rgba(138, 43, 226, 0.1)"
        },
        /* New color system */
        imperial: {
          primary: "var(--color-primary)",
          "primary-light": "var(--color-primary-light)",
          "primary-dark": "var(--color-primary-dark)",
          secondary: "var(--color-secondary)",
          "secondary-light": "var(--color-secondary-light)",
          "secondary-dark": "var(--color-secondary-dark)",
          accent: "var(--color-accent)",
          "accent-light": "var(--color-accent-light)",
          "accent-dark": "var(--color-accent-dark)",
          background: "var(--color-background)",
          surface: "var(--color-surface)",
          "surface-alt": "var(--color-surface-alt)",
          text: "var(--color-text)",
          "text-muted": "var(--color-text-muted)",
          "text-disabled": "var(--color-text-disabled)",
        },
        /* Neutral color scale */
        neutral: {
          50: "var(--color-neutral-50)",
          100: "var(--color-neutral-100)",
          200: "var(--color-neutral-200)",
          300: "var(--color-neutral-300)",
          400: "var(--color-neutral-400)",
          500: "var(--color-neutral-500)",
          600: "var(--color-neutral-600)",
          700: "var(--color-neutral-700)",
          800: "var(--color-neutral-800)",
          900: "var(--color-neutral-900)",
        },
        /* Status colors */
        status: {
          success: "var(--color-success)",
          warning: "var(--color-warning)",
          error: "var(--color-error)",
          info: "var(--color-info)",
        },
      },
      spacing: {
        'xs': 'var(--space-xs)',
        'sm': 'var(--space-sm)',
        'md': 'var(--space-md)',
        'lg': 'var(--space-lg)',
        'xl': 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
      },
      fontSize: {
        'xs': 'var(--font-size-xs)',
        'sm': 'var(--font-size-sm)',
        'base': 'var(--font-size-base)',
        'lg': 'var(--font-size-lg)',
        'xl': 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
        '5xl': 'var(--font-size-5xl)',
      },
      lineHeight: {
        'tight': 'var(--line-height-tight)',
        'normal': 'var(--line-height-normal)',
        'relaxed': 'var(--line-height-relaxed)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'DEFAULT': 'var(--shadow-md)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'inner': 'var(--shadow-inner)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 }
        },
        "slide-down": {
          "0%": { transform: "translateY(-10px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 }
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.8 }
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "slide-down": "slide-down 0.5s ease-out",
        "pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite"
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
      },
      gridTemplateColumns: {
        'auto-fill-card': 'repeat(auto-fill, minmax(280px, 1fr))',
        'auto-fit-card': 'repeat(auto-fit, minmax(280px, 1fr))',
      },
      maxWidth: {
        'readable': '65ch',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-luxury': 'linear-gradient(135deg, var(--color-background) 0%, var(--color-surface) 100%)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addComponents }) {
      addComponents({
        '.container-fluid': {
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: 'var(--space-md)',
          paddingRight: 'var(--space-md)',
          '@screen sm': {
            paddingLeft: 'var(--space-lg)',
            paddingRight: 'var(--space-lg)',
          },
          '@screen lg': {
            paddingLeft: 'var(--space-xl)',
            paddingRight: 'var(--space-xl)',
          },
        },
        '.luxury-card': {
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow-md)',
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: 'var(--shadow-lg)',
          },
        },
        '.btn-luxury': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.5rem 1.5rem',
          fontWeight: '600',
          borderRadius: 'var(--radius)',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          '&:focus': {
            outline: 'none',
            boxShadow: '0 0 0 3px rgba(212, 175, 55, 0.4)',
          },
        },
        '.btn-luxury-primary': {
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-text)',
          '&:hover': {
            backgroundColor: 'var(--color-primary-light)',
            transform: 'translateY(-2px)',
          },
        },
        '.btn-luxury-secondary': {
          backgroundColor: 'var(--color-secondary)',
          color: 'var(--color-background)',
          '&:hover': {
            backgroundColor: 'var(--color-secondary-light)',
            transform: 'translateY(-2px)',
          },
        },
        '.btn-luxury-outline': {
          backgroundColor: 'transparent',
          border: '2px solid var(--color-primary)',
          color: 'var(--color-text)',
          '&:hover': {
            backgroundColor: 'rgba(74, 44, 133, 0.1)',
            transform: 'translateY(-2px)',
          },
        },
      })
    },
  ],
}
