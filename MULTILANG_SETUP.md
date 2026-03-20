# Multi-Language Payment System Setup

This document explains the new multi-language payment system implementation.

## Features

- **Multi-language Support**: English, Marathi, and Tamil
- **Reusable Components**: Single BasePayment component used by different payment types
- **Multiple Payment Types**: Zilla Parishad (ZP) and Vidhan Sabha payments
- **Language Persistence**: Selected language is saved in localStorage
- **Responsive Design**: Works on desktop and mobile devices

## File Structure

```
src/
├── components/
│   ├── common/
│   │   ├── BasePayment.jsx      # Reusable payment component
│   │   └── LanguageSelector.jsx # Language switcher component
│   └── main/
│       ├── Payment.jsx          # Original payment page (now uses BasePayment)
│       ├── ZPPayment.jsx        # ZP-specific payment page
│       ├── VidhanSabhaPayment.jsx # Vidhan Sabha-specific payment page
├── contexts/
│   └── LanguageContext.js       # React context for language management
├── translations/
│   └── translations.js          # Translation strings for all languages
└── App.js                       # Example app setup with LanguageProvider
```

## Usage

### 1. Wrap your app with LanguageProvider

```jsx
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      {/* Your app components */}
    </LanguageProvider>
  );
}
```

### 2. Use payment components

```jsx
// For Zilla Parishad payments
import ZPPayment from './components/main/ZPPayment';

// For Vidhan Sabha payments  
import VidhanSabhaPayment from './components/main/VidhanSabhaPayment';

// For original payment (ZP type)
import Payment from './components/main/Payment';
```

### 3. Custom payment configurations

```jsx
import BasePayment from './components/common/BasePayment';

// Custom configuration
<BasePayment 
  type="zp" 
  customConfig={{
    corporationLabel: "Custom Label",
    showWard: false,
    // ... other custom configs
  }}
/>
```

## Routes

- `/` - Default payment page (ZP type)
- `/zp` - Zilla Parishad payment page
- `/tn` - Vidhan Sabha payment page (Tamil Nadu)

## Language Support

The system supports three languages:

- **English** (en): Default language
- **Marathi** (mr): मराठी
- **Tamil** (ta): தமிழ்

### Adding a New Language

1. Add translations to `src/translations/translations.js`
2. Add language option to `src/components/common/LanguageSelector.jsx`
3. Update language codes as needed

## Component Props

### BasePayment Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | string | 'zp' | Payment type ('zp' or 'vidhansabha') |
| customConfig | object | {} | Override default configuration |
| language | string | undefined | Force specific language (overrides context) |

### Configuration Options

When `type='zp'`:
- Shows ZP, ZP Gat, and Gan fields
- Labels: Zilla Parishad, ZP Gat, Gan

When `type='vidhansabha'`:
- Shows only Assembly Constituency field
- Hides ZP Gat and Gan fields
- Labels: Assembly Constituency

## WhatsApp Integration

The system automatically generates WhatsApp messages in the selected language with payment details. The message template includes:

- Candidate Name
- Mobile Number  
- Corporation/Constituency
- Ward/Gat (if applicable)
- Amount
- Payment link

## Styling

The components use Tailwind CSS classes and maintain the existing design system:
- Primary color: `#c60240` (red)
- Secondary color: `#a00235` (dark red)
- Responsive design with mobile-first approach

## Data Submission

Payment data is submitted to Google Apps Script endpoint with additional `type` field to distinguish between ZP and Vidhan Sabha payments.

## Browser Support

- Modern browsers with ES6+ support
- LocalStorage for language persistence
- Clipboard API for copy functionality
