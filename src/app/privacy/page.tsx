import { LegalDocumentShell } from "@/components/legal/LegalDocumentShell";
import {
  getLegalMetadata,
  loadLegalDocument,
} from "@/lib/legal/load-legal-page";

export const metadata = getLegalMetadata("privacy");

export default function PrivacyPage() {
  const document = loadLegalDocument("privacy");
  return <LegalDocumentShell document={document} />;
}
