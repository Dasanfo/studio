import { LiveTestClient } from "@/components/live-test-client";
import { getTestImages } from "@/lib/data";

export const metadata = {
    title: 'Live Test',
};

// Force dynamic rendering so the page reads sample images mounted at runtime (e.g., via Docker volume)
export const dynamic = 'force-dynamic';

export default async function LiveTestPage() {
    const testImages = await getTestImages();
    return <LiveTestClient testImages={testImages} />;
}
