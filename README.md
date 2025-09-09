# EscutaMed - AI-Powered Medical Consultation Platform

> **Transform your medical practice with AI that listens, understands, and records your consultations in real-time**

EscutaMed is an innovative web platform that uses artificial intelligence to automate the transcription and data extraction of medical consultations, allowing doctors to focus 100% on patient care while AI handles documentation.

## 🎯 Overview

EscutaMed solves a critical problem in medical practice: the need to document information during consultations, which divides the doctor's attention and compromises the quality of care. Our solution combines:

- **Automatic transcription** of audio in real-time
- **Intelligent extraction** of structured data
- **Specialized interface** by medical area
- **Complete and accurate** reports

## ✨ Key Features

### 🎤 Recording and Transcription
- Real-time audio recording during consultations
- Automatic transcription using Whisper (Groq)
- Support for audio file uploads
- Transcription editor for manual corrections

### 🧠 Intelligent Processing
- Automatic extraction of structured data using AI (Gemini)
- Support for multiple medical specialties
- Area-specific fields (Cardiology, Ophthalmology, Neurology, etc.)
- Automatic validation and formatting

### 📊 Specialized Interface
- Intuitive dashboard for doctors
- Sections organized by information type
- Structured visualization of extracted data
- Complete consultation history

### 🔒 Security and Compliance
- Secure authentication with Better Auth
- Encryption of sensitive data
- LGPD compliance
- Secure storage of medical information

## 🏗️ Technical Architecture

### Main Stack
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Better Auth
- **AI**: Google Gemini 2.5 Flash, Groq Whisper
- **UI**: shadcn/ui, Tailwind CSS, Radix UI

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Main dashboard
│   ├── api/               # API Routes
│   └── actions.ts         # Server Actions
├── components/            # Reusable components
├── config/               # Specialty configurations
├── lib/                  # Utilities and helpers
├── schemas/              # Zod schemas for validation
└── server/               # Database configuration
```

### Data Model
The system uses a flexible relational model where each consultation can have multiple data sections:

- **Consultation**: Main entity
- **Common Sections**: Identification, Main Complaint, History, etc.
- **Specific Sections**: By medical specialty
- **Relationships**: Optional 1:1 between consultation and sections

## 🚀 How to Use

### 1. Initial Setup

```bash
# Clone the repository
git clone https://github.com/your-username/escuta-med.git
cd escuta-med

# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your API keys
```

### 2. Database Configuration

```bash
# Run migrations
pnpm db:migrate:dev

# (Optional) Open Prisma Studio
pnpm db:studio
```

### 3. Run the Project

```bash
# Development mode
pnpm dev

# Build for production
pnpm build
pnpm start
```

## 🔧 Configuration

### Required Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# AI APIs
GOOGLE_API_KEY="your-google-key"
GROQ_API_KEY="your-groq-key"

# Authentication
BETTER_AUTH_SECRET="your-secret"
BETTER_AUTH_URL="http://localhost:3000"
```

### Supported Specialties

- **General**: Vital signs, general physical exam
- **Cardiology**: ECG, auscultation, cardiac events
- **Ophthalmology**: Visual acuity, intraocular pressure
- **Neurology**: Neurological exam, neuroimaging

## 📱 User Interface

### Main Dashboard
- Medical specialty selection
- Audio recording/upload interface
- Transcription editor
- Real-time processing

### Structured Results
- Sections organized by information type
- Editable and validated fields
- Clear and intuitive visualization
- Data export

### Consultation History
- Complete list of previous consultations
- Filters by date and specialty
- Detailed view of each consultation

## 🔒 Security

- **Authentication**: Robust system with Better Auth
- **Authorization**: User-based access control
- **Encryption**: Protected sensitive data
- **Compliance**: LGPD compliance
- **Audit**: Access and modification logs

## 🧪 Development

### Available Scripts

```bash
# Development
pnpm dev                 # Development server
pnpm dev:middleware      # With experimental HTTPS

# Database
pnpm db:generate         # Generate Prisma client
pnpm db:push            # Sync schema
pnpm db:migrate:dev     # Development migration
pnpm db:studio          # Visual database interface

# Code Quality
pnpm lint               # Check linting
pnpm lint:fix           # Fix lint issues
pnpm typecheck          # Check TypeScript types
pnpm format:write       # Format code
```

### Component Structure

- **UI Components**: Base shadcn/ui components
- **Feature Components**: Specific functionalities
- **Section Components**: Data section rendering
- **Form Components**: Specialized forms

## 📈 Roadmap

### Current Version (MVP)
- ✅ Audio transcription
- ✅ Specialty-specific data extraction
- ✅ Dashboard interface
- ✅ Consultation history
- ✅ Authentication and security

### Future Versions
- 🔄 Electronic health record integration
- 🔄 Management dashboard for clinics
- 🔄 Data analysis and reports
- 🔄 Support for more specialties
- 🔄 API for external integrations

## 🤝 Contributing

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
