import { SymptomChecker } from '@/components/symptom-checker/symptom-checker'

interface SymptomCheckerPageProps {
  searchParams: {
    query?: string
    topic?: string
  }
}

export default function SymptomCheckerPage({ searchParams }: SymptomCheckerPageProps) {
  return <SymptomChecker 
    initialQuery={searchParams.query}
    initialTopic={searchParams.topic}
  />
}