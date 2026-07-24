import { LegalDocumentShell } from "@/components/legal/LegalDocumentShell";
import {
  getLegalMetadata,
  loadLegalDocument,
} from "@/lib/legal/load-legal-page";

export const metadata = getLegalMetadata("terms");

export default function TermsPage() {
  const document = loadLegalDocument("terms");
  return <LegalDocumentShell document={document} />;
}
